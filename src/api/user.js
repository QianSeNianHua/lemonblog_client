import { get, post } from './http.js'

// 首页获取用户信息
export function homeInfo (userUUID) {
  return post('user/homeInfo', {
    userUUID
  })
}

// 获取用户详细信息
export function userInfo (userUUID) {
  return post('user/userInfo', {
    userUUID
  })
}

// 登录
export function login (account, password) {
  return post('user/login', {
    account,
    password
  })
}

// 获取验证码
export function verify () {
  return get('user/verify')
}
