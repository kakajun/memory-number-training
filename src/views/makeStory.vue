<template>
  <div class="memory-game">
    <!-- 顶部设置区域 -->
    <div class="top-setime">
      <div class="tittle-time">消失时间:</div>
      <el-input-number v-model="count" :min="1" :max="10" />
    </div>
    <div class="top-btn">
      <el-button @click="toggleShow">显示图片</el-button>
      <el-button @click="generateNewSet">换一组</el-button>
      <el-button @click="addSet">加一组</el-button>
      <el-button @click="submitAnswer">提交</el-button>
    </div>

    <!-- 检验区域 -->
    <div class="below-text">
      <span class="tittle-text">检验:</span>
      <el-input
        ref="myInput"
        class="check-input"
        v-model="state.checkText"
        @keyup.enter="submitAnswer"
      ></el-input>
    </div>

    <!-- 图片展示区域 -->
    <div class="bottom-section">
      <div class="image-grid">
        <div
          v-for="image in state.displayedImages"
          :key="image.name"
          class="image-cell"
        >
          <div v-if="state.numShow || state.show" class="number-display">
            {{ image.name }}
          </div>
          <img
            v-if="state.show"
            :src="image.url"
            :alt="image.name"
            @click="generateNewSet"
          />
        </div>
      </div>
    </div>

    <!-- 记忆攻略区域 -->
    <div v-if="state.show" class="below-text">
      <div class="tittle-text">记忆攻略:</div>
      <el-input
        v-model="state.storyText"
        :readonly="true"
        type="textarea"
        autosize
      ></el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reactive } from 'vue'
import { addNumber, getCacheImage } from '../utils/tool'
import type { ImageAsset } from '../utils/tool'
import { ElMessage } from 'element-plus'
import numImg from '../utils/numImg'
import { postAnswer } from '../api/ali'
import type { ElInput } from 'element-plus'

const state = reactive({
  show: false,
  numShow: true,
  displayedImages: [] as ImageAsset[],
  storyText: '思考中.......',
  currentNumber: '00',
  checkText: '',
  cacheTemp: [] as ImageAsset[]
})

const count = ref(4)
const delayTime = ref(4)
const myInput = ref<InstanceType<typeof ElInput> | null>(null)

const setHidden = () => {
  state.numShow = true
  setTimeout(() => {
    state.show = false
    state.numShow = false
  }, delayTime.value * 1000)
}

const toggleShow = () => {
  state.show = !state.show
}

const generateNewSet = async () => {
  const nextNumber = addNumber(state.currentNumber)
  state.currentNumber = nextNumber
  if (Number(nextNumber) > 99) {
    state.currentNumber = '00'
  }
  init()
}

const updateDisplayedImages = () => {
  state.displayedImages = [...state.cacheTemp]
}

const init = async () => {
  state.cacheTemp = await getCacheImage(state.currentNumber, count.value)
  updateDisplayedImages()
  // 清空输入框
  state.checkText = ''
  setHidden()
  setFocus()
  getTonyi()
}

const getTonyi = async () => {
  state.storyText = '思考中.......'
  const names = state.displayedImages.map(
    o => numImg.find(item => item.id === o.name)?.name
  )
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
            '怎么用连锁记忆法，简短的按顺序串联记忆: "' +
            names.join('","') +
            '"'
        }
      ]
    },
    group: 1,
    parameters: {}
  }
  const res = await postAnswer(params)
  if (res) {
    state.storyText = res.output?.text
  }
}

const addSet = () => {
  count.value += 4
  delayTime.value += 4
  init()
}

const submitAnswer = () => {
  const num = state.checkText.replace(/\s/g, '')
  const answer = state.displayedImages.map(o => o.name).join('')
  if (num === answer) {
    ElMessage.success('正确!')
    generateNewSet()
  } else {
    ElMessage.error('错误!')
    // 清空输入框
    state.checkText = ''
  }
}

const setFocus = () => {
  setTimeout(() => {
    myInput.value?.focus()
    console.log('获取焦点!!')
  }, 100)
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
.top-setime {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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
  margin-top: 20px;
}
.tittle-text {
  text-align: left;
  font-size: 18px;
  padding-bottom: 10px;
}
.check-input {
  padding: 20px 0;
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
