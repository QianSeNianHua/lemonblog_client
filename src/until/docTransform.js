import { handleDate } from '@/until/handleDate'

/**
 * 文章列表数据，进行分解，转换成需要的结构
 * @param res { rows: [] }
 */
export function transformList (res) {
  let data = [] // [{year: '', month: '', date: '', list: []}] 第一层同日，第二层同一天的文章
  let oldDate = '' // 存储上一个被存放的日期，'20190231'

  res.rows.forEach(year => {
    year.rows.forEach(month => {
      month.rows.forEach(item => {
        item.year = year.year
        item.month = month.month

        const t = handleDate(item.createTime)
        const newDate = `${t.year}${t.month}${t.date}`

        if (oldDate === newDate) {
          data[data.length - 1].list.push(item)
        } else {
          data.push({ year: t.year, month: t.month, date: t.date, list: [ item ] })
        }
      })
    })
  })

  return data
}
