import { computed, Ref } from 'vue'
import { getImages, cacheImage } from '../utils/tool'
const imageCache = new Map<string, HTMLImageElement>()

/**
 * @description: 格式化显示
 */
export function useElapsedTimeFormatter(rawTime: Ref<number>) {
  const elapsedTime = computed(() => {
    let time: number | string = rawTime.value
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

/**
 * @description: 加载图片
 */
export const getCacheImage = async (value: string) => {
  let temp = getImages(value)
  for (let index = 0; index < temp.length; index++) {
    const item = temp[index]
    await cacheImage(item, imageCache)
  }
  return temp
}
