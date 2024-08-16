/* 按序选图 */
<template>
  <div class="flex flex-col items-center justify-start p-20px">
    <!-- 数字显示与统计 -->
    <div class="text-center mb-20px">
      <div class="text-5xl font-bold mb-10px">{{ currentNumber }}</div>
      <div>
        <p class="text-xl my5px">正确: {{ correctCount }}</p>
        <p class="text-xl my5px">错误: {{ wrongCount }}</p>
      </div>
    </div>

    <!-- 图片展示区域 -->
    <div class="flex justify-center flex-wrap gap-15px">
      <div class="grid grid-cols-4 gap-10px w-full max-w-2xl">
        <div
          v-for="image in displayedImages"
          :key="image.name"
          class="image-cell"
        >
          <img
            class="w-full h-auto cursor-pointer border-2px border-solid divide-transparent transition duration-300 ease-in-out border hover:border-blue-500"
            :src="image.url"
            :alt="image.name"
            @click="checkAnswer(image.name)"
          />
        </div>
      </div>
    </div>

    <!-- 游戏时间 -->
    <div class="mt-20px text-lg">
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
import { ref, onMounted } from 'vue'
import { addNumber, getCacheImage } from '../utils/tool'
import type { ImageAsset } from '../utils/tool'
import useTimer from '../components/useTimer'
const { startTime, formattedElapsedTime, startTimer, stopTimer } = useTimer(0)

const dialogVisible = ref(false)
const currentNumber = ref('00')
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
  currentNumber.value = '00'
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
  const nextNumber = addNumber(currentNumber.value)
  const num = Number(nextNumber)
  if (num > 99) {
    stopTimer()
    dialogVisible.value = true
    return
  }
  updateDisplayedImages()
  // 更新当前数字
  currentNumber.value = nextNumber
  if (num > 99) return
  // 更新缓存图片
  cacheTemp = await getCacheImage(addNumber(currentNumber.value))
}

/**
 * @description: 初始化图片
 */
const init = async () => {
  cacheTemp = await getCacheImage(currentNumber.value)
  updateDisplayedImages()
  const nextNumber = addNumber(currentNumber.value)
  cacheTemp = await getCacheImage(nextNumber)
}

onMounted(() => {
  init()
})
</script>
