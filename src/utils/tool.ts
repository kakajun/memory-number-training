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
