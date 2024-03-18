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
          :key="image.id"
          class="image-cell"
        >
          <img
            :src="image.img"
            :alt="image.name"
            @click="checkAnswer(image.id)"
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
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted, watch, computed } from 'vue'
import images from '../utils/numImg'
const currentNumber = ref('00')
const correctCount = ref(0)
const wrongCount = ref(0)
const startTime = ref(new Date().toLocaleTimeString())
const elapsedTime = ref(0)
const timer = setInterval(() => {
  elapsedTime.value++
}, 1000)
const displayedImages = ref([])

const updateDisplayedImages = () => {
  // 实现选择图片的逻辑，确保一个匹配当前数字，其他随机
  // 简化示例，实际逻辑需要根据需求调整
  displayedImages.value = [
    /* 选中的图片数组 */
  ]
}

// 检查答案
const checkAnswer = (id: string) => {
  if (id === currentNumber.value) {
    correctCount.value++
    // 更新数字和图片逻辑
  } else {
    wrongCount.value++
  }
}

watch(currentNumber, newValue => {
  if (newValue === '99') {
    clearInterval(timer) // 停止计时
    alert('游戏结束')
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

@media (min-width: 768px) {
  .image-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
