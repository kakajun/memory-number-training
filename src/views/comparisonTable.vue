<template>
  <div class="table-wapper">
    <el-table :data="extendedNumImg" class="table-content">
      <el-table-column prop="id" label="序号" />
      <el-table-column prop="name" label="对应图片" width="180" />
      <el-table-column v-if="showSecondHalf" prop="id2" label="序号" />
      <el-table-column
        v-if="showSecondHalf"
        prop="name2"
        label="对应图片"
        width="180"
      />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import numImg from '../utils/numImg'

const extendedNumImg = numImg.slice(0, 50).map((ele, index) => ({
  ...ele,
  id2: numImg[index + 50]?.id,
  name2: numImg[index + 50]?.name
}))

const showSecondHalf = extendedNumImg.some(item => item.id2 !== undefined)
</script>

<style lang="scss" scoped>
$breakpoint: 768px; // 假设我们设置断点为 768px

.table-wapper {
  display: flex;
  align-items: center;
  justify-content: center;

  // 添加响应式布局
  @media (max-width: $breakpoint) {
    // 这里添加适配小屏设备的样式
  }
}
.table-content {
  padding: 20px;
  width: 600px;
}
</style>
