<template>
  <div class="">
    <!-- <el-input v-model="input" style="width: 240px" placeholder="Please input" /> -->
    <!-- 图片展示区域 -->
    <div class="bottom-section">
      <div class="image-grid">
        <div
          v-for="image in displayedImages"
          :key="image.name"
          class="image-cell"
        >
          <img
            :src="image.url"
            :alt="image.name"
            @click="checkAnswer(image.name)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup >
</script>

<style  lang='less' scoped>
</style>
