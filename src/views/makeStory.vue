<template>
  <div class="memory-game">
    <div class="top-setime">
      <div class="tittle-time">消失时间:</div>
      <el-input-number v-model="count" :min="1" :max="10" />
    </div>
    <div class="top-btn">
      <el-button @click="show = !show">显示图片</el-button>
      <el-button @click="checkAnswer()">换一组</el-button>
    </div>
    <!-- 图片展示区域 -->
    <div v-if="numShow" class="bottom-section">
      <div class="image-grid">
        <div
          v-for="image in displayedImages"
          :key="image.name"
          class="image-cell"
        >
          <div class="number-display">{{ image.name }}</div>

          <img
            v-if="show"
            :src="image.url"
            :alt="image.name"
            @click="checkAnswer()"
          />
        </div>
      </div>
    </div>

    <div v-if="show" class="below-text">
      <div class="tittle-text">记忆攻略:</div>
      <el-input
        v-model="storyText"
        :readonly="true"
        type="textarea"
        autosize
      ></el-input>
    </div>

    <div class="below-text">
      <div class="tittle-text">检验:</div>
      <el-input
        ref="myInput"
        class="tittle-text"
        v-model="checkText"
        type="textarea"
        autosize
      ></el-input>
    </div>
    <div class="btn-group">
      <el-button type="primary" @click="addGroup">加一组</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { addNumber, getCacheImage } from '../utils/tool'
import type { ImageAsset } from '../utils/tool'
import { ElMessage } from 'element-plus'
import numImg from '../utils/numImg'
import { postAnswer } from '../api/ali'
const count = ref(4)
const storyText = ref('思考中.......')

const currentNumber = ref('00')
const show = ref(false)
const numShow = ref(true)
const displayedImages = ref<ImageAsset[]>([])
const checkText = ref('')
const myInput = ref(null)
let cacheTemp: ImageAsset[] = []
let timer: any
const delayTime = ref(4)
const setHidden = () => {
  timer = setTimeout(() => {
    show.value = false
    numShow.value = false
  }, delayTime.value * 1000)
}
onBeforeUnmount(() => {
  clearTimeout(timer)
})
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
const checkAnswer = async () => {
  numShow.value = true
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
  setHidden()
}

/**
 * @description: 初始化图片
 */
const init = async () => {
  setHidden()
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
            '怎么用连锁记忆法，简短的按顺序串联记忆: "' + names.join('","')
        }
      ]
    },
    group: 1,
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

const submit = () => {
  // 去掉数值里面的所有空格
  const num = checkText.value.replace(/\s/g, '')
  const answer = displayedImages.value.map(o => o.name).join('')
  if (num === answer) {
    ElMessage.success('正确!')
    checkAnswer()
  } else {
    ElMessage.error('错误!')
  }
}
onMounted(async () => {
  // 确保 DOM 更新后执行此操作
  myInput.value?.focus()
  await init()
  getTonyi()
})
</script>
<style lang="scss" scoped>
.top-setime {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .tittle-time {
    margin-right: 10px;
  }
}
.top-btn {
  margin-bottom: 10px;
}
::v-deep .ep-textarea__inner {
  font-size: 16px;
}
.below-text {
  width: 80%;
  max-width: 600px;
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

.tittle-text {
  text-align: left;
  font-size: 30px;
  padding-bottom: 10px;
}
.image-cell img:hover {
  border-color: #007bff;
}
</style>
