import { ref, onBeforeUnmount, onMounted, computed } from 'vue'

export default function useTimer(initialValue = 0) {
  const elapsedTime = ref(initialValue)
  const timerRef = ref<NodeJS.Timeout | null>(null)
  const startTime = ref('')

  /**
   * @description: 格式化显示
   */

  const formattedElapsedTime = computed(() => {
    const time = elapsedTime.value
    return time >= 60 ? `${Math.floor(time / 60)}分${time % 60}秒` : `${time}秒`
  })

  function startTimer(intervalMs = 1000) {
    startTime.value = new Date().toLocaleTimeString()
    stopTimer()
    timerRef.value = setInterval(() => {
      elapsedTime.value++
    }, intervalMs)
  }

  function stopTimer() {
    if (timerRef.value) {
      clearInterval(timerRef.value)
      timerRef.value = null
    }
  }

  onBeforeUnmount(stopTimer)

  onMounted(() => {
    startTimer()
  })

  return {
    startTime,
    formattedElapsedTime,
    startTimer,
    stopTimer
  }
}
