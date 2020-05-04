/**
 * 地址
 */
let baseURL = null

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  baseURL = 'http://127.0.0.1:7001'
} else if (process.env.NODE_ENV === 'production') {
  // 生产环境
  baseURL = 'http://127.0.0.1:7001'
}

export {
  baseURL
}
