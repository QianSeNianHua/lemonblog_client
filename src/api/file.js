import { get, post } from './http.js'
import { postIn, postForm } from './authHttp.js'

// 获取文章列表，只获取已发布的
export function getFileList (userUUID, folderId = null, page = 1, count = 10, desc = true) {
  return post('file/getFileList', {
    userUUID,
    folderId,
    desc,
    count,
    page
  })
}

// 获取文章列表，获取已发布的和未发布的
export function getAllFileList (folderId = null, desc = true) {
  return postIn('file/getAllFileList', {
    folderId,
    desc
  })
}

// 获取文章内容，只获取已发布的文章，供普通用户编辑
export function getArticle (fileUUID) {
  return post('file/getArticle', {
    fileUUID
  })
}

// 获取文章内容，可获取已发布或未发布的文章，供管理者编辑
export function getAllArticle (fileUUID) {
  return postIn('file/getAllArticle', {
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

// 新建文章
export function createAritcle (folderId) {
  return postIn('file/createArticle', {
    folderId
  })
}
