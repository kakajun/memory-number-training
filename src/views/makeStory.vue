<template>
  <div class="memory-game">
    <!-- 图片展示区域 -->
    <div class="bottom-section">
      <div class="image-grid">
        <div
          v-for="image in displayedImages"
          :key="image.name"
          class="image-cell"
        >
          <div class="number-display">{{ image.name }}</div>
          <img
            :src="image.url"
            :alt="image.name"
            @click="checkAnswer(image.name)"
          />
        </div>
      </div>
    </div>

    <div class="below-text">
      <div class="tittle-text">记忆攻略:</div>
      <el-input
        v-model="storyText"
        :readonly="true"
        type="textarea"
        autosize
      ></el-input>
    </div>
    <div class="btn-group">
      <el-button type="primary" size="middle" @click="addGroup"
        >加一组</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { addNumber, getCacheImage } from '../utils/tool'
import type { ImageAsset } from '../utils/tool'

import numImg from '../utils/numImg'
import { postAnswer } from '../api/ali'
const count = ref(4)
const storyText = ref('思考中.......')
const dialogVisible = ref(false)
const currentNumber = ref('00')

const displayedImages = ref<ImageAsset[]>([])

let cacheTemp: ImageAsset[] = []

/**
 * @description: 由于外网速度慢,如果点击时再去加载图片,那么会导致卡顿,所以先预加载图片,这里拿的是上次已经缓存好的图片
 */
const updateDisplayedImages = () => {
  displayedImages.value = [...cacheTemp]
}

/**
 * @description: 图片点击事件
 * @param {*} name
 */
const checkAnswer = async (name: string) => {
  let nextNumber = addNumber(currentNumber.value)
  const num = Number(nextNumber)

  updateDisplayedImages()
  getTonyi()
  // 更新当前数字
  currentNumber.value = nextNumber
  if (num > 99) {
    currentNumber.value = '00'
  }
  // 更新缓存图片
  cacheTemp = await getCacheImage(addNumber(currentNumber.value), count.value)
}

/**
 * @description: 初始化图片
 */
const init = async () => {
  cacheTemp = await getCacheImage(currentNumber.value, count.value)
  updateDisplayedImages()
  let nextNumber = addNumber(currentNumber.value)
  cacheTemp = await getCacheImage(nextNumber, count.value)
}

/**
 * @description: 根据图片编故事
 */
const getTonyi = async () => {
  storyText.value = '思考中.......'
  const names = displayedImages.value.map(o => {
    const obj = numImg.find(item => item.id === o.name)
    return obj && obj.name
  })
  const params = {
    model: 'qwen-turbo',
    input: {
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.'
        },
        {
          role: 'user',
          content:
            '清除上下文，按顺序记住这几个词和它出现的顺序，请帮我编一个故事按词语的顺序串联：' +
            names.join('-') +
            '要求:1.场景可以是不符合实际的，只要方便我记住图片的顺序。2.注意词的顺序按前面提供的出现。3.简短方便记忆。4.关键词只出现一次。'
        }
      ]
    },
    parameters: {}
  }
  const res = await postAnswer(params)
  if (res) {
    storyText.value = res.output?.text
  }
}

const addGroup = async () => {
  count.value = count.value + 4
  await init()
  getTonyi()
}
onMounted(async () => {
  await init()
  getTonyi()
})
</script>
<style scoped>
::v-deep .ep-textarea__inner {
  font-size: 16px;
}
.below-text {
  width: 600px;
  margin-top: 40px;
}
.tittle-text {
  text-align: left;
  font-size: 18px;
  padding-bottom: 10px;
}
.btn-group {
  margin-top: 40px;
}
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
  font-size: 40px;
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
  grid-template-columns: repeat(4, 1fr);
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
</style>
