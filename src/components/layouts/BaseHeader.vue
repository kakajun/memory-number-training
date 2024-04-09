<script lang="ts" setup>
import { toggleDark } from '~/composables'
import { useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
const route = useRoute()
const activeIndex = ref('/')
// 获取路由实例并立即调用push方法
const router = useRouter()

const pushUrl = (url: string) => {
  router.push(url)
}

const jump = () => {
  window.open('https://github.com/kakajun/memory-number-training')
}

// 当参数更改时获取用户信息
watch(
  () => route.path,
  newId => {
    // console.log('路由变化了', newId)
    activeIndex.value = newId
  }
)
</script>

<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="/" @click="pushUrl('/')">按序选图</el-menu-item>
    <el-menu-item index="/reverseOrder" @click="pushUrl('/reverseOrder')"
      >倒序选图</el-menu-item
    >
    <el-menu-item index="/random" @click="pushUrl('/random')"
      >随机选图</el-menu-item
    >
    <el-menu-item index="/makeStory" @click="pushUrl('/makeStory')"
      >看图说话</el-menu-item
    >
    <el-menu-item index="/comparisonTable" @click="pushUrl('/comparisonTable')"
      >对照表</el-menu-item
    >
    <el-menu-item index="/pai" @click="pushUrl('/pai')">圆周率</el-menu-item>
    <el-menu-item index="/pai" @click="jump">git地址</el-menu-item>
    <el-menu-item h="full" @click="toggleDark()">
      <button
        class="border-none w-full bg-transparent cursor-pointer"
        style="height: var(--ep-menu-item-height)"
      >
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
  </el-menu>
</template>
