<template>
  <vue-scroll class="articleList" @handle-scroll="transDate">
    <div class="box" ref="artlist">
      <div class="content_title">{{ curYear }}年</div>
      <article-card-all
        v-for="(ld, i) in listData" :key="'y' + i" :data-year="ld.year"
        :res="ld">
        <template v-slot="{ list }">
          <article-card
            v-for="item in list" :key="item.fileUUID" :to="{ name: 'PanelArticle', params: { articleId: item.fileUUID } }"
            :res="item">
          </article-card>
        </template>
      </article-card-all>
      <el-pagination
        background layout="prev, pager, next" :total="total"
        :page-size="size" :current-page="current" @current-change="pageChange">
      </el-pagination>
    </div>
  </vue-scroll>
</template>

<script>
/**
 * 文章列表
 */
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'
import ArticleCardAll from '@/components/ArticleCard/ArticleCardAll'
import ArticleCard from '@/components/ArticleCard/ArticleCard'
import { handleDate } from '@/until/handleDate'

@Component({
  components: {
    ArticleCardAll,
    ArticleCard
  }
})
class ArticleList extends Vue {
  // 数据
  @Prop({ default: () => { return { rows: [] } } })
  res

  // 全部数量
  @Prop({ type: Number, default: 0 })
  total

  // 每页数量
  @Prop({ type: Number, default: 2 })
  size

  // 当前列表所在时间线——年
  curYear = '-'
  // 当前页码
  current = 1

  // 分解res的数据，转换成需要的结构
  get listData () {
    let data = [] // [{year: '', month: '', date: '', list: []}] 第一层同日，第二层同一天的文章
    let oldDate = '' // 存储上一个被存放的日期，'20190231'

    // if (this.$route.name === 'PanelCategoryDocs') {
    //   // 分类的文档
    //   this.res = this.res
    //   this.pageInfo.total = this.res.count
    // }

    this.res.rows.forEach(year => {
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

    this.curYear = (this.res.rows.length > 0 && this.res.rows[0].year) || '0'

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

  // 页码改变事件
  @Emit()
  pageChange (val) {
    this.current = val

    return val
  }
}

export default ArticleList
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
.box {
  margin: 0px auto;
  padding-top: 40px;
  overflow: hidden;
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
.el-pagination {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 30px;

  &.is-background /deep/ .btn-next, &.is-background /deep/ .btn-prev, &.is-background /deep/ .el-pager li {
    background-color: white;
  }
}
</style>
