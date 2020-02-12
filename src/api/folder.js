import { get, post } from './http.js'

// 获取分类列表
export function getFolderList (userUUID, page = 1, count = 10) {
  return post('folder/getFolderList', {
    userUUID,
    count: 10,
    page: 1
  })
}
