<template>
  <div class="docBrief">
    <vue-scroll @handle-scroll="transDate">
      <div class="box" ref="artlist">
        <div class="content_title">{{ curYear }}年</div>
        <div
          class="content_list" v-for="(item, i) in listData" :key="'y' + i"
          :data-year="item.year">
          <div class="date">
            <span class="date_title">{{ item.month }}月{{ item.date }}日</span>
            <span class="date_point"></span>
          </div>
          <div class="list">
            <article-card
              v-for="list in item.list" :key="list.fileUUID" :to="{ name: 'PanelArticle', params: { aid: list.fileUUID } }"
              :res="list" />
          </div>
        </div>
        <el-pagination
          background layout="prev, pager, next" :total="pageInfo.total"
          :page-size="pageInfo.size" :current-page="pageInfo.current" @current-change="pageChange">
        </el-pagination>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
/**
 * 文档
 */
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import ArticleCard from '@/components/ArticleCard'
import * as API from '@/api'
import { handleDate } from '@/until/handleDate'

@Component({
  components: {
    ArticleCard
  }
})
class DocBrief extends Vue {
  // 当前列表所在时间线——年
  curYear = '2019'
  // 数据，包含全部文档的数据，和分类的文档的数据
  pdbRes = { rows: [] }
  // 页码
  pageInfo = {
    total: 0, // 全部数量
    size: 10, // 每页数量
    current: 1 // 当前页码
  }

  // 分类的文档的数据
  @Prop({ type: Object, default: () => { return { rows: [] } } })
  res

  mounted () {
    if (this.$route.name === 'PanelDocBrief') {
      // 全部文档
      this.getFileList(this.$route.params.id, this.pageInfo.current)
    }
  }

  @Watch('$route.params.id')
  onIdChanged (nV, oV) {
    // 全部文档
    this.getFileList(this.$route.params.id)
  }

  // 分解res的数据，转换成需要的结构
  get listData () {
    let data = [] // [{year: '', month: '', date: '', list: []}] 第一层同日，第二层同一天的文章
    let oldDate = '' // 存储上一个被存放的日期，'20190231'

    if (this.$route.name === 'PanelCategoryDocs') {
      // 分类的文档
      this.pdbRes = this.res
      this.pageInfo.total = this.res.count
    }

    this.pdbRes.rows.forEach(year => {
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

    this.curYear = this.pdbRes.rows.length > 0 && this.pdbRes.rows[0].year

    return data
  }

  // 获取.content_list节点
  get listEl () {
    const lists = Array.from(this.$refs.artlist.children)
    lists.shift()

    return lists
  }

  // 滚动到对应日期
  transDate (vertical, horizontal, nativeEvent) {
    let barScrollTop = vertical.scrollTop

    // 获取滚动到当前出现的节点，并更改顶部的年日期
    let el = this.listEl.filter((item, index) => {
      if (index < this.listEl.length - 1) {
        if (barScrollTop >= item.offsetTop && barScrollTop < this.listEl[index + 1].offsetTop) {
          return true
        }
      } else {
        if (barScrollTop >= item.offsetTop) {
          return true
        }
      }
    })

    if (el.length > 0) {
      this.curYear = el[0].getAttribute('data-year')
    }
  }

  // 接口获取全部文档列表
  getFileList (userUUID, current) {
    API.file.getFileList(userUUID, '', current).then(res => {
      if (res.code !== 0) return

      const data = this.pdbRes = res.data
      this.pageInfo.total = data.count
    })
  }

  // 页码改变事件
  pageChange (val) {
    this.pageInfo.current = val
    this.getFileList(this.$route.params.id, val)
  }
}

export default DocBrief
</script>

<style lang="less" scoped>
@media screen and (max-width: 860px) {
  .box, .content_title {
    width: 510px;
  }
}
@media screen and (min-width: 860px) and (max-width: 1210px) {
  .box, .content_title {
    width: 860px;
  }
}
@media screen and (min-width: 1210px) {
  .box, .content_title {
    width: 1210px;
  }
}
.docBrief {
  width: 100%;
  height: 100%;
}
.box {
  margin: 0px auto;
  margin-top: 40px;
}
.content_title {
  height: 40px;
  line-height: 40px;
  font-size: 30px;
  font-weight: 600;
  color: white;
  text-shadow: 1px 1px 2px #333, 0 0 20px #409EFF;
  background-color: #f9f9f9;
  text-align: center;
  position: fixed;
  top: 60px;
  z-index: 1;

  &::before {
    content: '';
    display: inline-block;
    width: 120px;
    height: 100%;
    border-right: 5px solid rgba(0, 0, 0, 0.05);
    position: absolute;
    left: 0px;
  }
}
.content_list {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.date {
  width: 160px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;

  &>.date_title {
    width: 120px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-top: 100px;
    color: var(--color-contrast-ruby);
  }
  &>.date_point {
    width: 5px;
    float: left;
    background-color: rgba(0,0,0,0.05);
    position: relative;

    &::before {
      content: '';
      display: block;
      width: 12px;
      height: 12px;
      background-color: var(--color-contrast-ruby);
      border-radius: 6px;
      position: absolute;
      top: 108px;
      left: -4px;
    }
  }
}
.list {
  flex-grow: 1;
  float: left;

  &>.articleCard {
    margin: 15px 50px;
    margin-left: 0px;
  }
}
.el-pagination {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 30px;

  &.is-background /deep/ .btn-next, &.is-background /deep/ .btn-prev, &.is-background /deep/ .el-pager li {
    background-color: white;
  }
}
</style>

<style>
  :root {
    --color-contrast-ruby: #D8334A;
    --color-contrast-deep-ruby: #C22E42;
    --color-contrast-grapefruit: #ED5565;
    --color-contrast-deep-grapefruit: #D54C5B;
    --color-contrast-bittersweet: #FC6E51;
    --color-contrast-deep-bittersweet: #E26349;
    --color-contrast-sunflower: #FFCE54;
    --color-contrast-deep-sunflower: #E5B94B;
    --color-contrast-straw: #E8CE4D;
    --color-contrast-deep-straw: #D0B945;
    --color-contrast-grass: #A0D468;
    --color-contrast-deep-grass: #90BE5D;
    --color-contrast-mint: #48CFAD;
    --color-contrast-deep-mint: #41BA9B;
    --color-contrast-aqua: #4FC1E9;
    --color-contrast-deep-aqua: #47ADD1;
    --color-contrast-plum: #8067B7;
    --color-contrast-deep-plum: #735CA4;
    --color-contrast-lavender: #AC92EC;
    --color-contrast-deep-lavender: #9A83D4;
  }
</style>
