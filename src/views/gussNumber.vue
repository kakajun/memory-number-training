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
      <p>开始时间: {{ startTime }}</p>
      <p>用时: {{ elapsedTime }} 秒</p>
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
import { getImages, addNumber } from '../utils/tool'

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

type ImageAsset = {
  name: string
  url: string
} // 或者更具体的类型
const displayedImages = ref<ImageAsset[]>([])

const updateDisplayedImages = async () => {
  let temp = getImages(currentNumber.value)
  displayedImages.value = temp
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
  updateDisplayedImages()
}

/**
 * @description: 图片点击事件
 * @param {*} name
 */
const checkAnswer = (name: string) => {
  if (name === currentNumber.value) {
    correctCount.value++
  } else {
    wrongCount.value++
  }
  currentNumber.value = addNumber(currentNumber.value)
}

watch(currentNumber, newValue => {
  const num = Number(newValue)
  if (num > 99) {
    clearInterval(timer) // 停止计时
    dialogVisible.value = true
    return
  }
  updateDisplayedImages()
})

onMounted(() => {
  updateDisplayedImages()
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
