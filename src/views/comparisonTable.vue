<template>
  <div class="flex items-center justify-center">
    <el-table :data="extendedNumImg" class="p-20px" style="max-width: 1000px">
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
