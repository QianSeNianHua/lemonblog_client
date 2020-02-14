import { get, post } from './http.js'

// 获取文件列表
export function getFileList (userUUID, folderId = '', page = 1, count = 10) {
  return post('file/getFileList', {
    userUUID,
    folderId,
    count,
    page
  })
}
