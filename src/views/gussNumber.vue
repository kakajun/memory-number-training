<template>
  <div class="memory-game">
    <!-- 数字显示与统计 -->
    <div class="top-section">
      <div class="number-display">{{ currentNumber }}</div>
      <div class="stats">
        <p>正确: {{ correctCount }}</p>
        <p>错误: {{ wrongCount }}</p>
      </div>
    </div>

    <!-- 图片展示区域 -->
    <div class="bottom-section">
      <div class="image-grid">
        <div
          v-for="image in displayedImages"
          :key="image.name"
          class="image-cell"
        >
          <img
            :src="image.url"
            :alt="image.name"
            @click="checkAnswer(image.name)"
          />
        </div>
      </div>
    </div>

    <!-- 游戏时间 -->
    <div class="game-time">
      <p>用时: {{ formattedElapsedTime }}</p>
      <p>开始时间: {{ startTime }}</p>
    </div>
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="恭喜！"
    append-to-body
    width="500"
    :before-close="handleClose"
  >
    <div class="content">
      <span>本轮游戏您的成绩：</span>
      <p style="color: green">正确: {{ correctCount }}</p>
      <p style="color: red">错误: {{ wrongCount }}</p>
      <p>用时: {{ elapsedTime }} 秒</p>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleClose"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, watch, computed } from 'vue'
import { getImages, addNumber, preloadImage, cacheImage } from '../utils/tool'
import type { ImageAsset } from '../utils/tool'
import { useElapsedTimeFormatter } from '../utils/useElapsedTimeFormatter'

const dialogVisible = ref(false)
const currentNumber = ref('00')
const correctCount = ref(0)
const wrongCount = ref(0)
const startTime = ref(new Date().toLocaleTimeString())
const elapsedTime = ref(0)
let timer = setInterval(() => {
  elapsedTime.value++
}, 1000)

const fileTypes = [] // 接收所有图片
const displayedImages = ref<ImageAsset[]>([])


const formattedElapsedTime = useElapsedTimeFormatter(elapsedTime.value)
let cacheTemp: { name: string; url: string }[] = []

/**
 * @description: 由于外网速度慢,如果点击时再去加载图片,那么会导致卡顿,所以先预加载图片,这里拿的是上次已经缓存好的图片
 */
const updateDisplayedImages = async () => {
  displayedImages.value = [...cacheTemp]
}

/**
 * @description: 加载图片
 */
const getCacheImage = async (value: string) => {
  let temp = getImages(value)
  for (let index = 0; index < temp.length; index++) {
    const item = temp[index]
    await cacheImage(item, imageCache)
  }
  return temp
}

const handleClose = () => {
  dialogVisible.value = false
  currentNumber.value = '00'
  correctCount.value = 0
  wrongCount.value = 0
  startTime.value = new Date().toLocaleTimeString()
  elapsedTime.value = 0
  timer = setInterval(() => {
    elapsedTime.value++
  }, 1000)
  init()
}

/**
 * @description: 图片点击事件
 * @param {*} name
 */
const checkAnswer = async (name: string) => {
  if (name === currentNumber.value) {
    correctCount.value++
  } else {
    wrongCount.value++
  }
  let nextNumber = addNumber(currentNumber.value)
  const num = Number(nextNumber)
  if (num > 99) {
    clearInterval(timer) // 停止计时
    dialogVisible.value = true
    return
  }
  updateDisplayedImages()
  // 更新当前数字
  currentNumber.value = nextNumber
  // 更新缓存图片
  cacheTemp = await getCacheImage(addNumber(currentNumber.value))
}

/**
 * @description: 初始化图片
 */
const init = async () => {
  cacheTemp = await getCacheImage(currentNumber.value)
  updateDisplayedImages()
  let nextNumber = addNumber(currentNumber.value)
  cacheTemp = await getCacheImage(nextNumber)
}

onMounted(() => {
  init()
})
</script>
<style scoped>
.memory-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 20px;
}

.top-section {
  text-align: center;
  margin-bottom: 20px;
}

.number-display {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 10px;
}

.stats p {
  font-size: 20px;
  margin: 5px 0;
}

.bottom-section {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 600px;
}

.image-cell img {
  width: 100%;
  height: auto;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.image-cell img:hover {
  border-color: #007bff;
}

.game-time {
  margin-top: 20px;
  font-size: 18px;
}
.content {
  width: 180px;
  font-size: 16px;
  margin: 0 auto;
}
</style>
