/**
 * 封装axios请求
 * 用户保持登录的请求
 */

import Axios from 'axios'
import { baseURL } from '@/api/url'
import { Message } from 'element-ui'

const axios = Axios.create()

axios.defaults.baseURL = baseURL
axios.defaults.timeout = 600000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 客户端需要发起一次带有 Credentials 请求头的信息的请求，请求到的cookie才能被浏览器保存
axios.defaults.withCredentials = true

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token')
    config.headers.Authorization = token

    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    const response = error.response

    if (response.status === 401 && response.config.url !== 'user/inUserInfo') {

    } else if (error.message.includes('timeout')) {
      Message({
        message: '请求超时，请稍后再试',
        type: 'warning'
      })
    } else if (response.config.url !== 'user/inUserInfo') {
      Message({
        message: '网络连接失败，请稍后再试',
        type: 'warning'
      })
    }

    return Promise.reject(response)
  }
)

/**
 * 登录后的post请求
 * @param {String} url 地址
 * @param {Object} params 参数
 */
export function postIn (url, params) {
  return axios.post(url, JSON.stringify(params))
}

/**
 * 文件上传
 */
export function postForm (url, params, callback) {
  return axios.post(url, params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: e => {
      let progress = (e.loaded / e.total * 100) | 0

      callback(progress)
    }
  })
}
