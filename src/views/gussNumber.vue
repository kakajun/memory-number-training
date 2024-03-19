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
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, watch, computed } from 'vue'
import { shuffleArray, randomNum } from '../utils/tool'

const currentNumber = ref('00')
const correctCount = ref(0)
const wrongCount = ref(0)
const startTime = ref(new Date().toLocaleTimeString())
const elapsedTime = ref(0)
const timer = setInterval(() => {
  elapsedTime.value++
}, 1000)

const fileTypes = [] // 接收所有图片

type ImageAsset = {
  name: string
  url: string
} // 或者更具体的类型
const displayedImages = ref<ImageAsset[]>([])

const updateDisplayedImages = async () => {
  let temp = <ImageAsset[]>[]
  // 实现选择图片的逻辑，确保一个匹配当前数字，其他随机
  for (let index = 0; index < 3; index++) {
    const name = randomNum()
    const imageObject = { name, url: '/src/assets/memoryImg/' + name + '.png' }
    temp.push(imageObject)
  }
  temp.push({
    name: currentNumber.value,
    url: '/src/assets/memoryImg/' + currentNumber.value + '.png'
  })
  // 任意打乱temp里面的顺序
  temp = shuffleArray(temp)
  console.log(temp, 'shuffleArray')

  displayedImages.value = temp
}

// 设置方法给currentNumber每次加1,如果是个位数前面补0
function addNumber() {
  const num = Number(currentNumber.value)
  return num >= 9 ? String(num + 1) : '0' + String(num + 1)
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
  currentNumber.value = addNumber()
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
</style>
