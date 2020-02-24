/**
 * 设置cookie
 * @param {string} key 键名
 * @param {string} value 值
 * @param {number} expiredays 保存多少天
 */
export function setCookie (key, value, expiredays) {
  let exdate = new Date()

  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = `${key}=${escape(value)}${(expiredays === null) ? '' : ';expires' + exdate.toGMTString() || exdate.toUTCString()}`
}

/**
 * 获取cookie
 * @param {string} key 键名
 */
export function getCookie (key) {
  let reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`)
  let arr = document.cookie.match(reg)

  if (arr) return arr[2]
  else return null
}

/**
 * 删除cookie
 * @param {string} key 键名
 */
export function delCookie (key) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)

  let cval = getCookie(key)
  if (cval != null) {
    document.cookie = `${name}=${cval};expires=${exp.toGMTString() || exp.toUTCString()}`
  }
}
