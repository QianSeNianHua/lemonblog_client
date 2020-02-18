/**
 * 处理日期
 * @param {string} res 日期
 */
export function handleDate (res) {
  // 字符串首增加0
  function addZero (str, len, count) {
    for (let i = 0; i < (count - len); i++) {
      str = '0' + str
    }

    return str
  }

  let d = new Date(res)
  let mo = '' + (d.getUTCMonth() + 1)
  let da = '' + d.getUTCDate()
  let ho = '' + d.getUTCHours()
  let mi = '' + d.getUTCMinutes()
  let se = '' + d.getUTCSeconds()
  let ms = '' + d.getUTCMilliseconds()

  return {
    year: d.getUTCFullYear(),
    month: addZero(mo, mo.length, 2),
    date: addZero(da, da.length, 2),
    hourse: addZero(ho, ho.length, 2),
    minutes: addZero(mi, mi.length, 2),
    seconds: addZero(se, se.length, 2),
    milliseconds: addZero(ms, ms.length, 3)
  }
}
