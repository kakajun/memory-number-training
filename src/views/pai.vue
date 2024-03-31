<template>
  <div class="memory-game">
    <div class="top-btn">
      <el-button @click="show = !show">显示数字</el-button>
    </div>
    <div class="top-text">
      <div class="top-text-tittle" style="padding-bottom: 10px">
        3.141592 6 53 58 97 93 23 84 62 64 33 83 27 95 02 88 41 97 16 93 99 37
        51 05
      </div>
      <div class="top-text-img"><img src="../img/pi.png" alt="" /></div>
    </div>

    <div class="below-text">
      <div class="tittle-text">检验:</div>
      <el-input v-model="checkText" type="textarea" autosize></el-input>
    </div>
    <div class="btn-group">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
const pi = '3.141592653589793238462643383279502884197169399375105'
const checkText = ref('')

const show = ref(false)

const submit = () => {
  if (checkText.value === pi) {
    alert('正确')
  } else {
    alert('错误')
  }
}
onMounted(async () => {})
</script>
<style lang="scss" scoped>
.top-btn {
  margin-bottom: 10px;
}
::v-deep .ep-textarea__inner {
  font-size: 16px;
}
.below-text {
  width: 80%;
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
  box-sizing: border-box;
}

.number-display {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 10px;
}
.top-text {
  width: 100%;
  font-size: 30px;
  .top-text-img {
    width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>
