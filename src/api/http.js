/**
 * 封装axios请求
 */

import axios from 'axios'
import QS from 'qs'

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  axios.defaults.baseURL = 'http://127.0.0.1:7001'
} else if (process.env.NODE_ENV === 'production') {
  // 生产环境
  axios.defaults.baseURL = 'http://127.0.0.1:7001'
}

axios.defaults.timeout = 600000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

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
        reject(err.data)
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
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
