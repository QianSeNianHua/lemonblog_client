/**
 * 封装axios请求
 */

// import QS from 'qs'
import axios from 'axios'
import { Message } from 'element-ui'

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  axios.defaults.baseURL = 'http://127.0.0.1:7001'
} else if (process.env.NODE_ENV === 'production') {
  // 生产环境
  axios.defaults.baseURL = 'http://127.0.0.1:7001'
}

axios.defaults.timeout = 600000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.message.includes('timeout')) {
      Message({
        message: '请求超时，请稍后再试',
        type: 'warning'
      })
    } else {
      Message({
        message: '网络连接失败，请稍后再试',
        type: 'warning'
      })
    }

    return Promise.reject(error)
  }
)

/**
 * post请求
 * @param {String} url 地址
 * @param {Object} params 参数
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, JSON.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * get请求
 * @param {String} url 地址
 * @param {Object} params 参数
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
