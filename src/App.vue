<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div class="flex main-container">
      <div w="full" py="4">
        <!-- <Logos my="4" />
        <HelloWorld msg="Hello Vue 3 + Element Plus + Vite" /> -->
          <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
      </div>
    </div>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 3px);
}
</style>
