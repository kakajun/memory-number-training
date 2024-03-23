/* 倒序选图*/
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
  <rightDialog
    v-model:visible="dialogVisible"
    :formattedElapsedTime="formattedElapsedTime"
    :wrongCount="wrongCount"
    :startTime="startTime"
    @close="handleClose"
  ></rightDialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { minusNumber, getCacheImage } from '../utils/tool'
import type { ImageAsset } from '../utils/tool'
import useTimer from '../components/useTimer'
import rightDialog from '../components/RightDialog.vue'
const { startTime, formattedElapsedTime, startTimer, stopTimer } = useTimer(0)

const dialogVisible = ref(false)
const currentNumber = ref('99')
const correctCount = ref(0)
const wrongCount = ref(0)

const displayedImages = ref<ImageAsset[]>([])

let cacheTemp: ImageAsset[] = []

/**
 * @description: 由于外网速度慢,如果点击时再去加载图片,那么会导致卡顿,所以先预加载图片,这里拿的是上次已经缓存好的图片
 */
const updateDisplayedImages = () => {
  displayedImages.value = [...cacheTemp]
}

const handleClose = () => {
  dialogVisible.value = false
  currentNumber.value = '99'
  correctCount.value = 0
  wrongCount.value = 0
  startTimer()
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
  let nextNumber = minusNumber(currentNumber.value)
  const num = Number(nextNumber)
  if (num === 0) {
    stopTimer()
    dialogVisible.value = true
    return
  }
  updateDisplayedImages()
  // 更新当前数字
  currentNumber.value = nextNumber
  if (num < 0) return
  // 更新缓存图片
  cacheTemp = await getCacheImage(minusNumber(currentNumber.value))
}

/**
 * @description: 初始化图片
 */
const init = async () => {
  cacheTemp = await getCacheImage(currentNumber.value)
  updateDisplayedImages()
  let nextNumber = minusNumber(currentNumber.value)
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
</style>
