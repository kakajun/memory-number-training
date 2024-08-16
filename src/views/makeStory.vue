<template>
  <div class="flex items-center flex-col p-20px">
    <!-- 顶部设置区域 -->
    <div class="flex items-center mb-10px">
      <div class="mr-10px">消失时间:</div>
      <el-input-number class="mr-6" v-model="delayTime" :min="1" />
      <el-switch
        v-model="state.storyType"
        class="m-2"
        active-text="连锁法"
        inactive-text="故事法"
      />
    </div>
    <div class="mb-10px">
      <el-button @click="toggleShow">显示图片</el-button>
      <el-button @click="generateNewSet">换一组</el-button>
      <el-button @click="addSet">加一组</el-button>
      <el-button @click="submitAnswer">提交</el-button>
    </div>

    <!-- 检验区域 -->
    <div class="w-4/5 max-w-2xl mt-10px pb-10px">
      <div class="flex justify-between">
        <div class="pb-10px">
          <span class="text-left text-3xl pb-10px">检验: </span>
          <span class="text-left text-3xl pb-10px">{{ state.count }} 组</span>
        </div>

        <div class="flex">
          <p class="text-xl my-5px">正确: {{ state.correctCount }}</p>
          <p class="pl10px text-xl my-5px">错误: {{ state.wrongCount }}</p>
        </div>
      </div>
      <el-input
        ref="myInput"
        class="check-input text-2xl px-20px"
        v-model="formattedCheckText"
        @keyup.enter="submitAnswer"
      ></el-input>
    </div>

    <!-- 图片展示区域 -->
    <div class="flex justify-center flex-wrap gap-15px">
      <div
        v-if="state.numShow || state.show"
        class="grid grid-cols-4 gap-10px w-full max-w-2xl"
      >
        <div
          v-for="image in state.displayedImages"
          :key="image.name"
          class="image-cell"
        >
          <div v-if="state.show" class="text-4xl font-bold mb-10px">
            {{ image.name }}
          </div>
          <img
            class="w-full h-auto cursor-pointer border-2px border-solid divide-transparent transition duration-300 ease-in-out border hover:border-blue-500"
            :src="image.url"
            :alt="image.name"
            @click="generateNewSet"
          />
        </div>
      </div>
    </div>

    <!-- 记忆攻略区域 -->
    <div v-if="state.show" class="w-4/5 max-w-2xl mt-20px">
      <div class="text-left text-3xl pb-10px">记忆攻略:</div>
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
import { ref, onMounted, computed } from 'vue'
import { reactive } from 'vue'
import { addNumber, getCacheImage } from '../utils/tool'
import type { ImageAsset } from '../utils/tool'
import { ElMessage } from 'element-plus'
import numImg from '../utils/numImg'
import { postAnswer } from '../api/ali'
import type { ElInput } from 'element-plus'

const BASE_TIME = 10 // 一组记忆时间
const ADD_NUMBER = 4 //每次加多的数

const state = reactive({
  count: 0, // 检验几组
  storyType: true,
  show: false,
  numShow: true,
  displayedImages: [] as ImageAsset[],
  storyText: '思考中.......',
  currentNumber: '00',
  checkText: '',
  cacheTemp: [] as ImageAsset[],
  correctCount: 0,
  wrongCount: 0,
  timerID: null as null | number
})

const count = ref(4) // 初始几个图片

const delayTime = ref(BASE_TIME)
const myInput = ref<InstanceType<typeof ElInput> | null>(null)

const setHidden = () => {
  state.numShow = true
  state.timerID = setTimeout(() => {
    state.show = false
    state.numShow = false
  }, delayTime.value * 1000) as unknown as number // 先断言为unknown，再断言为number
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
  state.count++
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
  // 如果是显示图片情况,不隐藏图片
  if (!state.show) {
    setHidden()
  } else {
    clearTimeout(state.timerID as number)
  }
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
            (state.storyType
              ? '你是记忆大师, 教我用连锁法,简短的按顺序串联记忆: "'
              : '你是记忆大师, 教我用故事法,简短的按顺序串联记忆: "') +
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
  count.value += ADD_NUMBER // 加一组
  delayTime.value += BASE_TIME
  init()
}

const submitAnswer = () => {
  const num = state.checkText.replace(/\s/g, '')
  const answer = state.displayedImages.map(o => o.name).join('')
  if (num === answer) {
    ElMessage.success('正确!')
    state.correctCount++
  } else {
    ElMessage.error('错误!')
    state.wrongCount++
  }
  // 清空输入框
  state.checkText = ''
  generateNewSet()
}

const setFocus = () => {
  setTimeout(() => {
    myInput.value?.focus()
    console.log('获取焦点!!')
  }, 100)
}

const formattedCheckText = computed({
  get() {
    return formatInputWithSpaces(state.checkText)
  },
  set(value) {
    state.checkText = value.replace(/\s/g, '') // 在设置时移除所有空格，保持原始值无空格
  }
})

const formatInputWithSpaces = (input: string) => {
  if (!input || !/\d/.test(input)) {
    // 如果输入为空或不包含数字，则直接返回原值
    return input
  }

  return input.replace(/\d{2}(?=\d)/g, '$& ') // 在每两位数字后面插入一个空格
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
:deep(.ep-textarea__inner) {
  font-size: 16px;
}

.check-input {
  :deep(.ep-input__wrapper) {
    height: 40px;
  }
}
</style>
