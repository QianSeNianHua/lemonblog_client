import { get, post } from './http.js'
import { postIn } from './authHttp.js'

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
export function login (data) {
  return post('user/login', data)
}

// 获取验证码
export function verify () {
  return get('user/verify')
}

// 登录后获取用户信息
export function inUserInfo () {
  return postIn('user/inUserInfo')
}

// 修改昵称
export function modifyUserInfo (nickname, briefIntro) {
  return postIn('user/modifyUserInfo', {
    nickname,
    briefIntro
  })
}
