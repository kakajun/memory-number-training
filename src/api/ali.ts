// 异步函数，用于发送 POST 请求
async function postData(url = '', data = {}) {
  try {
    const response = await fetch(url, {
      method: 'POST', // 请求方法：GET、POST、PUT、DELETE 等
      // mode: 'no-cors', // 跨域请求模式：no-cors、cors、same-origin
      // cache: 'no-cache', // 缓存模式：default、no-cache、reload、force-cache、only-if-cached
      // credentials: 'same-origin', // 凭据模式：include、same-origin、omit
      headers: {
        'Content-Type': 'application/json', // 请求头中的 Content-Type
        Authorization: 'Bearer ' + import.meta.env.VITE_ALIBABA_API_KEY
      },
      // redirect: 'follow', // 重定向模式：manual、follow、error
      // referrerPolicy: 'no-referrer', // 引用策略：no-referrer、no-referrer-when-downgrade、origin、origin-when-cross-origin、same-origin、strict-origin、strict-origin-when-cross-origin、unsafe-url
      body: JSON.stringify(data) // 请求体数据，必须与 Content-Type 头中指定的类型匹配
    })
    debugger
    return response.json() // 将响应解析为 JSON 对象
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export async function postAnswer(data: any) {
  try {
    const response = await postData(
      '/app/api/v1/services/aigc/text-generation/generation',
      data
    )
    return response
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
