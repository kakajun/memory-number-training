/**
 * 给数组洗牌
 */
export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // 生成从0到i的随机索引
    const j = Math.floor(Math.random() * (i + 1))
    // 交换元素array[i]和array[j]
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

/**
 * 生成一个两位的随机数字符串
 * @returns 生成的随机数字符串
 */
export function randomNumberString(): string {
  // 使用Math.random()生成0到1之间的随机小数
  const randomDecimal = Math.random()
  // 将随机小数转换为0到99之间的整数
  const randomInteger = Math.floor(randomDecimal * 100)
  // 将整数转换为两位的字符串
  const randomString = randomInteger.toString().padStart(2, '0')
  return randomString
}

/**
 * @description: 生成0-99 唯一随机数
 */
export function uniqueNumberGenerator(): () => string {
  // 生成0-99的数组步长为1, 1位数前面补0
  const randomNumbers = Array.from({ length: 100 }, (_, i) => {
    return i < 10 ? '0' + i : i
  })
  const generatedNumbers = shuffleArray(randomNumbers)
  return function generate() {
    // 每次调用取最后一个元素,generatedNumbers去掉一个
    const newNumber = generatedNumbers.pop()
    return newNumber
  }
}

const baseUrl = import.meta.env.BASE_URL

export const createImageAsset = (name: string): ImageAsset => ({
  name,
  url: baseUrl + `memoryImg/${name}.png`
})

/**
 * @description: 根据数字生成随机3个数的图片组, 要求不重复,且不能有多个自己
 */
export function getImages(value: string): ImageAsset[] {
  const uniqueNumbers = new Set<string>()
  uniqueNumbers.add(value)
  while (uniqueNumbers.size < 4) {
    const name = randomNumberString()
    if (name !== value) {
      uniqueNumbers.add(name)
    }
  }
  let temp = Array.from(uniqueNumbers).map(createImageAsset)
  temp = shuffleArray(temp)
  return temp
}

// 设置方法给currentNumber每次加1,如果是个位数前面补0
export function addNumber(value: string) {
  const num = Number(value)
  return num >= 9 ? String(num + 1) : '0' + String(num + 1)
}

/**
 * @description: 根据url缓存图片
 */
export async function preloadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}
export type ImageAsset = {
  name: string
  url: string
}

/**
 * @description: 根据url获取图片, 有就拿缓存图片,没有就预先加载
 */
export function cacheImage(
  image: ImageAsset,
  imageCache: Map<string, HTMLImageElement>
) {
  if (!imageCache.has(image.url)) {
    preloadImage(image.url)
      .then(cachedImage => {
        imageCache.set(image.url, cachedImage)
      })
      .catch(err => console.error('Error preloading image:', err)) // 添加错误处理
  }
}
