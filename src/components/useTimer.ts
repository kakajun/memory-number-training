// src/composables/useTimer.ts
import { ref, unref, onBeforeUnmount, onMounted, computed } from 'vue'

export default function useTimer(initialValue = 0) {
  const elapsedTime = ref(initialValue)
  const timerRef = ref<NodeJS.Timeout | null>(null)
  const startTime = ref('')
  /**
   * @description: 格式化显示
   */

  const formattedElapsedTime = computed(() => {
    let time: number | string = elapsedTime.value
    // 如果大于等于60秒,格式化为分钟和秒
    if (time >= 60) {
      time = `${Math.floor(time / 60)}分${time % 60}秒`
    } else {
      time = time + '秒' // 将小于60秒的时间转为字符串形式
    }
    return time as string
  })

  function startTimer(intervalMs = 1000) {
    startTime.value = new Date().toLocaleTimeString()
    stopTimer()
    timerRef.value = setInterval(() => {
      elapsedTime.value++
    }, intervalMs)
  }

  function stopTimer() {
    const currentTimer = unref(timerRef)
    if (currentTimer) {
      clearInterval(currentTimer)
      timerRef.value = null
    }
  }

  onBeforeUnmount(stopTimer)

  onMounted(() => {
    // 根据需要选择是否在这里启动计时器，默认不启动
    startTimer()
  })

  return {
    startTime,
    formattedElapsedTime,
    startTimer,
    stopTimer
  }
}
