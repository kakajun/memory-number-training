// useElapsedTimeFormatter.ts
import { computed } from 'vue'
const imageCache = new Map<string, HTMLImageElement>()
export function useElapsedTimeFormatter(rawTime: number) {
  const elapsedTime = computed(() => {
    let time: number | string = rawTime
    // 如果大于等于60秒,格式化为分钟和秒
    if (time >= 60) {
      time = `${Math.floor(time / 60)}分${time % 60}秒`
    } else {
      time = time + '秒' // 将小于60秒的时间转为字符串形式
    }
    return time as string
  })

  return elapsedTime
}
