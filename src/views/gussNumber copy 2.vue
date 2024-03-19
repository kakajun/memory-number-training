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

<script setup lang="ts">
import { defineComponent, ref, onMounted, watch, computed } from 'vue'

const currentNumber = ref('00')
const correctCount = ref(0)
const wrongCount = ref(0)
const startTime = ref(new Date().toLocaleTimeString())
const elapsedTime = ref(0)
const timer = setInterval(() => {
  elapsedTime.value++
}, 1000)

// 定义一个响应式数据存储导入的图片
const images = {}

// 使用 import.meta.globEager 批量导入图片
const imageModules = import.meta.globEager('../assets/memoryImg/*.png')

// 迭代图片模块并获取实际的图片路径
for (const path in imageModules) {
  images[path] = imageModules[path].default
}
console.log(images, '555')

type ImageAsset = any // 或者更具体的类型
const displayedImages = ref<ImageAsset[]>([])
const temp = <ImageAsset[]>[]
const updateDisplayedImages = async () => {
  // 实现选择图片的逻辑，确保一个匹配当前数字，其他随机
  for (let index = 0; index < 3; index++) {
    // 随机生成0-9的数字
    const numSt1 = String(Math.floor(Math.random() * 10))
    const numSt2 = String(Math.floor(Math.random() * 10))
    const name = numSt1 + numSt2

    const imageObject = { name, img: images[name] }
    temp.push(imageObject)
  }
  displayedImages.value = temp
  console.log(displayedImages)
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
