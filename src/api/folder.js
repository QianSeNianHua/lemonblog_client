import { get, post } from './http.js'
import { postIn, postForm } from './authHttp.js'

// 获取分类列表
export function getFolderList (userUUID) {
  return post('folder/getFolderList', {
    userUUID
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
