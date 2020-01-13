<template>
  <div class="docBrief">
    <vue-scroll @handle-scroll="transDate">
      <div class="box" ref="artlist">
        <div class="content_title">{{ curYear }}年</div>
        <div class="content_list" data-year="2019">
          <div class="date">
            <span class="date_title">12月27日</span>
            <span class="date_point"></span>
          </div>
          <div class="list">
            <article-card :to="{ name: 'PanelArticle' }" />
          </div>
        </div>
        <div class="content_list" data-year="2018">
          <div class="date">
            <span class="date_title">12月26日</span>
            <span class="date_point"></span>
          </div>
          <div class="list">
            <article-card />
          </div>
        </div>
        <div class="content_list" data-year="2017">
          <div class="date">
            <span class="date_title">12月25日</span>
            <span class="date_point"></span>
          </div>
          <div class="list">
            <article-card />
            <article-card />
            <article-card />
            <article-card />
            <article-card />
            <article-card />
            <article-card />
            <article-card />
          </div>
        </div>
        <el-pagination
          background layout="prev, pager, next" :total="50"
          :page-size="10"
        >
        </el-pagination>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
/**
 * 文档
 */
import { Vue, Component } from 'vue-property-decorator'
import ArticleCard from '@/components/ArticleCard'

@Component({
  components: {
    ArticleCard
  }
})
class DocBrief extends Vue {
  curYear = '2019' // 当前列表所在时间线——年

  mounted () {
    let childs = Array.from(this.$refs.artlist.children)
    childs.shift()
  }

  // 获取.content_list节点
  get listEl () {
    const lists = Array.from(this.$refs.artlist.children)
    lists.shift()

    return lists
  }

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
