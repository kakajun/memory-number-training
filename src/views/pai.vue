<template>
  <div class="flex items-center flex-col p-20px">
    <div class="mt-40px">
      <el-button @click="show = !show">显示数字图片</el-button>
    </div>
    <div class="mt-10px w-full text-center text-3xl" v-if="show">
      <div class="w-full mx-auto my-0">
        <img src="../img/pi.png" alt="" />
      </div>
      <div class="pb-10px">
        3.141592 6 53 58 97 93 23 84 62 64 33 83 27 95 02 88 41 97 16 93 99 37
        51 05
      </div>
    </div>

    <div class="w-4/5 max-w-2xl mt-20px">
      <div class="text-left text-3xl pb-10px">检验:</div>
      <el-input
        ref="myInput"
        class="text-left text-3xl pb-10px"
        v-model="checkText"
        @keyup.enter="submit"
      ></el-input>
    </div>
    <div class="btn-group">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
const pi = '3.141592653589793238462643383279502884197169399375105'
const checkText = ref('')
const myInput = ref<HTMLInputElement | null>(null)
const show = ref(false)

const submit = () => {
  // 去掉数值里面的所有空格
  const num = checkText.value.replace(/\s/g, '')
  if (num === pi) {
    ElMessage.success('正确!')
  } else {
    ElMessage.error('错误!')
  }
}

const setFocus = () => {
  myInput.value?.focus()
}
onMounted(() => {
  setFocus()
})
</script>
