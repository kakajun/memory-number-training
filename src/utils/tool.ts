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
export function randomNum() {
  const numSt1 = String(Math.floor(Math.random() * 10))
  const numSt2 = String(Math.floor(Math.random() * 10))
  return numSt1 + numSt2
}

/**
 * @description: 生成唯一随机数
 */
export function uniqueNumberGenerator(): () => string {
  const generatedNumbers = new Set() // 存储已生成的数字
  return function generate() {
    let newNumber
    do {
      newNumber = randomNum()
    } while (generatedNumbers.has(newNumber)) // 如果数字已存在，重新生成
    generatedNumbers.add(newNumber) // 添加新生成的唯一数字到集合中
    return newNumber
  }
}

export const createImageAsset = (name: string) => ({
  name,
  url: `/src/assets/memoryImg/${name}.png`
})

export function getImages(value: string) {
  const uniqueNumbers = new Set()
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
