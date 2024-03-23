<template>
  <div class="table-wapper">
    <el-table class="table-content" :data="numImg2">
      <el-table-column prop="id" label="序号" />
      <el-table-column prop="name" label="对应图片" width="180" />
      <el-table-column prop="id2" label="序号" />
      <el-table-column prop="name2" label="对应图片" width="180" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import numImg from '../utils/numImg'
// 假设 numImg 的元素类型为：
interface NumImgElement {
  id: string
  name: string
}

// 新建一个包含 id2 和 name2 属性的类型：
interface ExtendedNumImgElement extends NumImgElement {
  id2?: string
  name2?: string
}
// 把100个数字重组一下, 后面50个加入到前面数组中,命名分别为id2,name2
const numImg2 = numImg.splice(0, 50)
numImg2.forEach((ele, index) => {
  ;(ele as ExtendedNumImgElement).id2 = numImg[index].id
  ;(ele as ExtendedNumImgElement).name2 = numImg[index].name
})
</script>

<style lang="scss" scoped>
.table-wapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.table-content {
  padding: 20px;
  width: 600px;
}
</style>
