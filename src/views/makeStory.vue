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

<script setup  lang="ts">
import { postAnswer } from '~/api/ali'
import { ref, reactive, onMounted, computed } from 'vue'
import { getImages, addNumber, preloadImage, cacheImage } from '../utils/tool'
import type { ImageAsset } from '../utils/tool'
const displayedImages = ref<ImageAsset[]>([])
const imageCache = new Map<string, HTMLImageElement>()


</script>

<style  lang='less' scoped>
</style>
