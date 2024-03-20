export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // 生成从0到i的随机索引
    const j = Math.floor(Math.random() * (i + 1))
    // 交换元素array[i]和array[j]
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// 随机生成0-9的数字
export function randomNum(): string {
  const numSt1 = String(Math.floor(Math.random() * 10))
  const numSt2 = String(Math.floor(Math.random() * 10))
  return numSt1 + numSt2
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

export function getImages(value: string): ImageAsset[] {
  const uniqueNumbers = new Set<string>()
  uniqueNumbers.add(value)
  while (uniqueNumbers.size < 4) {
    const name = randomNum()
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

// imagePreloader.ts

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
} // 或者更具体的类型
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
