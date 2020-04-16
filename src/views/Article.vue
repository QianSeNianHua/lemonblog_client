<template>
  <div class="article">
    <vue-scroll ref="refVuescroll">
      <div class="box" v-if="Object.keys(artRes).length !== 0">
        <div class="box-content">
          <h1 class="header__title">{{ artRes.title }}</h1>
          <div class="header__info">
            <span class="folder">
              <el-image fit="cover" src="https://www.easyicon.net/api/resizeApi.php?id=1183173&size=128">
                <div slot="error">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <label>{{ artRes.folderName }}</label>
            </span>
            <!-- 2019.01.20 09:07:39 -->
            <time>{{ createTime }}</time>
            <span>访问 {{ artRes.visit }}</span>
          </div>
          <!-- 文章 -->
          <article class="content__text">
            <p v-html="artRes.content"></p>
          </article>
        </div>
        <section class="comment-content" id="comment-content">
          <!-- 评论区头部 -->
          <h3 class="header__title">
            <span class="note__title">全部评论</span>
            <span class="note__num">{{ comPage.total }}</span>
            <span :class="{ note__author: true, selected: authorSelected }" @click="authorHandle" :data-disabled="!comPage.total">只看作者</span>
            <span class="note__datetime" @click="datetimeHandle" :data-disabled="!comPage.total">
              时间排序
              <i :class="{ 'el-icon-sort-down': !dateSelected, 'el-icon-sort-up': dateSelected }"></i>
            </span>
          </h3>
          <template v-if="comPage.total">
            <!-- 评论区域 -->
            <brief-state>
              <brief-state-one
                @reply="reply" v-for="(one, i) in comRes.rows" :key="'c' + one.commentId"
                :res="handleCommentOne(one, { floor: i + 1 + comPage.size * (comPage.current - 1) })">
                <brief-state-two
                  @reply="reply" v-for="two in one.child" :key="'c' + two.commentId"
                  :res="two"></brief-state-two>
              </brief-state-one>
            </brief-state>
            <el-pagination
              background layout="prev, pager, next" :total="comPage.total"
              :page-size="comPage.size" :current-page="comPage.current" @current-change="pageChange">
            </el-pagination>
          </template>
          <!-- 评论区空数据 -->
          <div class="none-comment" v-else>没有评论数据</div>
        </section>
        <!-- 底部栏——写评论 -->
        <comment
          @to-comment="toComment" @announce-handle="announceHandle" ref="refComment"
          :comtotal="comPage.total"></comment>
        <!-- 滚动到顶部按钮 -->
        <back-top :target="target">
          <el-button icon="el-icon-caret-top" circle></el-button>
        </back-top>
      </div>
      <template v-else>
        <div class="none_panel">
          <icon-svg icon-class="none" class="i-icon icon-none"></icon-svg>
          <span>页面空数据</span>
        </div>
      </template>
    </vue-scroll>
  </div>
</template>

<script>
/**
 * 文章页面
 */
import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import * as API from '@/api'
import { handleDate } from '@/until/handleDate'
import Comment from '@/components/Comment'
import BackTop from '@/components/BackTop'
import BriefState from '@/components/BriefState/BriefState'
import BriefStateOne from '@/components/BriefState/BriefStateOne'
import BriefStateTwo from '@/components/BriefState/BriefStateTwo'

@Component({
  components: {
    Comment,
    BackTop,
    BriefState,
    BriefStateOne,
    BriefStateTwo
  }
})
class Article extends Vue {
  // 滚动对象
  target = null
  // 只看作者
  authorSelected = false
  // 时间排序
  dateSelected = true
  // 文章数据
  artRes = {}
  // 评论数据
  comRes = { rows: [] }
  // 评论页码
  comPage = {
    total: 0,
    size: 10,
    current: 1
  }

  @Ref()
  refVuescroll

  @Ref()
  refComment

  mounted () {
    this.getArticleData(this.$route.params.articleId)
    this.getCommentData(this.$route.params.articleId, this.comPage.current, this.dateSelected)
    this.target = this.refVuescroll
  }

  @Watch('$route.params')
  onRouteChanged (nV, oV) {
    this.getArticleData(nV.articleId)
    this.getCommentData(nV.articleId, this.comPage.current, this.dateSelected)
  }

  // 转换为时间格式
  get createTime () {
    let d = handleDate(this.artRes.createTime)

    return `${d.year}-${d.month}-${d.date} ${d.hours}:${d.minutes}`
  }

  // 事件,只看作者
  authorHandle () {
    if (!this.comPage.total) return

    this.authorSelected = !this.authorSelected
    if (this.authorSelected) {
      // 只看作者
      this.getAuthorCommentData(this.$route.params.articleId, this.dateSelected)
    } else {
      this.getCommentData(this.$route.params.articleId, this.comPage.current, this.dateSelected)
    }
  }

  // 事件,时间排序
  datetimeHandle () {
    if (!this.comPage.total) return

    this.dateSelected = !this.dateSelected
    if (this.authorSelected) {
      // 只看作者
      this.getAuthorCommentData(this.$route.params.articleId, this.dateSelected)
    } else {
      this.getCommentData(this.$route.params.articleId, this.comPage.current, this.dateSelected)
    }
  }

  // 滚动到评论区位置
  toComment () {
    this.refVuescroll.scrollIntoView('#comment-content', 500)
  }

  // 事件发布
  announceHandle () {
    this.refComment.cancelHandle()
  }

  // 评论回复
  reply (val) {
    this.refComment.initInput(val || '')
  }

  // 获取文章数据
  getArticleData (fileUUID) {
    API.file.getArticle(fileUUID).then(res => {
      if (res.code !== 0) return

      const data = this.artRes = res.data
    })
  }

  // 获取评论数据
  getCommentData (fileUUID, current) {
    API.file.getComment(fileUUID, current, this.dateSelected).then(res => {
      if (res.code !== 0) return

      const data = this.comRes = res.data
      this.comPage.total = data.count

      this.appointName(data.rows)
    })
  }

  // 只获取作者的评论数据
  getAuthorCommentData (fileUUID, desc) {
    API.file.getAuthorComment(fileUUID, desc).then(res => {
      if (res.code !== 0) return

      const data = this.comRes = res.data
      this.comPage.total = data.count

      this.appointName(data.rows)
    })
  }

  // 页面改变事件
  pageChange (val) {
    this.comPage.current = val

    this.getCommentData(this.$route.params.articleId, val)
  }

  // 返回处理后的第一层评论数据
  handleCommentOne (res, obj) {
    return {
      ...res,
      ...obj
    }
  }

  // 处理哪个用户进行评论
  appointName (data) {
    data.forEach(one => {
      one.child.forEach(two => {
        if (two.appointCommentId === null) return

        one.child.some(item => {
          if (item.commentId === two.appointCommentId) {
            two.appointname = item.nickname
          }
        })
      })
    })
  }
}

export default Article
</script>

<style lang="less" scoped>
.article {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.box {
  width: 730px;
  margin: 0px auto;
  overflow: hidden;

  &>.box-content {
    background-color: white;
    margin: 10px 0px;
    margin-bottom: 20px;
    padding: 24px;
  }
  &>.comment-content {
    background-color: white;
    margin-bottom: 96px;
    padding: 24px;
  }
}
.box-content {
  &>.header__title {
    font-size: 30px;
    color: #404040;
    font-weight: 700px;
    margin-bottom: 15px;
  }
  &>.header__info {
    font-size: 13px;
    color: #969696;
    margin-bottom: 32px;
    height: 30px;
    line-height: 30px;

    &>*:not(:last-child) {
      margin-right: 10px;
    }
    &>.folder>.el-image {
      width: 20px;
      height: 20px;
      vertical-align: middle;

      /deep/ i {
        position: absolute;
        top: 3.5px;
        left: 3.5px;
      }
    }
  }
  &>.content__text {
    font-size: 16px;
    line-height: 28px;
    font-weight: 400;
    color: #404040;
    font-feature-settings: 'liga' 0, 'calt' 0;
    letter-spacing: 1px;
    white-space: pre-wrap;
    text-size-adjust: 100%;

    & *::selection {
      background-color: #DEEDCB;
    }
  }
}
.comment-content {
  &>h3.header__title {
    border-left: 4px solid #409EFF;
    margin-bottom: 30px;
    padding-left: 12px;
    font-size: 18px;
    font-weight: 500;
    height: 26px;
    line-height: 26px;
    color: #404040;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    &>.note__title {
      flex-shrink: 0;
    }
    &>.note__num {
      font-size: 14px;
      font-weight: 400;
      margin-left: 6px;
      flex-shrink: 0;
    }
    &>.note__author, &>.note__datetime {
      display: inline-block;
      height: 26px;
      border: 1px solid #eee;
      border-radius: 13px;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      padding: 2px 8px;
      cursor: pointer;
      color: #969696;
      margin-left: 12px;
      user-select: none;
      flex-shrink: 0;

      &[data-disabled="true"] {
        cursor: not-allowed;
      }
      &.selected {
        background-color: #409EFF;
        color: white;
      }
    }
  }
  &>.comment__ul {
    &>.comment__li {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;

      &>.el-image {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: aliceblue;
        flex-shrink: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      &>.content {
        margin-left: 10px;
        margin-bottom: 20px;
        padding-bottom: 16px;
        border-bottom: 1px solid #eee;
        flex-grow: 1;

        &>.nickname {
          height: 20px;
          font-size: 15px;
          line-height: 20px;
          color: #404040;
        }
        &>.datetime {
          height: 17px;
          font-size: 12px;
          line-height: 17px;
          margin-top: 2px;
          color: #969696;
        }
        &>.text {
          margin-top: 10px;
          font-size: 16px;
          line-height: 24px;
          color: #404040;
          white-space: pre-wrap;
        }
        &>.feedback {
          height: 20px;
          font-size: 15px;
          line-height: 20px;
          margin-top: 12px;
          color: #b0b0b0;

          i {
            cursor: pointer;
          }
          i::before {
            margin-right: 5px;
          }
          i:hover {
            color: #409EFF;
          }
        }
      }
    }
  }
  &>.el-pagination {
    margin-top: 24px;
    margin-bottom: 8px;
    text-align: center;
  }
}
ul, li {
  list-style: none;
}
.none-comment {
  text-align: center;
  color: #999;
}
</style>
