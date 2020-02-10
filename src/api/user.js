import { get, post } from './http.js'

// 获取用户信息
export function homeInfo (userUUID) {
  return post('user/userInfo', {
    userUUID
  })
}
