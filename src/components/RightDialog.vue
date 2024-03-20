<template>
  <el-dialog
    v-model="dialogVisible"
    title="恭喜！"
    append-to-body
    width="500"
    :before-close="handleClose"
  >
    <div class="content">
      <span>本轮游戏您的成绩：</span>
      <p style="color: green">正确: {{ correctCount }}</p>
      <p style="color: red">错误: {{ wrongCount }}</p>
      <p>用时: {{ formattedElapsedTime }}</p>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleClose"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { computed, defineEmits } from 'vue'
const emits = defineEmits(['close', 'update:visible'])
// 接收props
const props = defineProps({
  visible: Boolean,
  formattedElapsedTime: String,
  wrongCount: Number,
  correctCount: Number
})
const dialogVisible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emits('update:visible', value)
  }
})
const handleClose = () => {
  emits('close')
}
</script>
<style scoped>
.content {
  width: 180px;
  font-size: 16px;
  margin: 0 auto;
}
</style>
