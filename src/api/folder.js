import { get, post } from './http.js'
import { postIn, postForm } from './authHttp.js'

// 获取分类列表
export function getFolderList (userUUID, page = 1, count = 10) {
  return post('folder/getFolderList', {
    userUUID,
    count: 10,
    page
  })
}

// 新建分类文件夹
export function createFolder (formData, callback) {
  return postForm('folder/createFolder', formData, callback)
}

// 删除分类文件夹
export function deleteFolder (folderId) {
  return postIn('folder/deleteFolder', {
    folderId
  })
}
