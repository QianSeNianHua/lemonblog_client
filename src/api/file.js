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

// 获取文章内容
export function getArticle (fileUUID) {
  return post('file/getArticle', {
    fileUUID
  })
}

// 获取全部的评论
export function getComment (fileUUID, page = 1, desc = true, count = 10) {
  return post('file/getComment', {
    fileUUID,
    desc,
    count,
    page
  })
}

// 获取作者的评论
export function getAuthorComment (fileUUID, desc = true) {
  return post('file/getAuthorComment', {
    fileUUID,
    desc
  })
}
