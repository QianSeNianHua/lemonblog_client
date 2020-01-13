<template>
  <div class="article">
    <vue-scroll ref="refVuescroll">
      <div class="box">
        <div class="box-content">
          <h1 class="header__title">Vue自定义组件中Props中接收数组或对象</h1>
          <div class="header__info">
            <span class="folder">
              <el-image fit="cover" src="https://www.easyicon.net/api/resizeApi.php?id=1183173&size=128">
                <div slot="error">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <label>文件夹</label>
            </span>
            <time>2019.01.20 09:07:39</time>
            <span>访问 164</span>
          </div>
          <article class="content__text">
            <p> 今天我们来讨论一个历史八卦：武则天先跟李世民过了20年，始终没有怀孕，但是为什么和李治生活1年就有了孩子？这个问题涉及到了古人的私生活，请先允许有书君上柱香拜一拜古人，免得……（BOSS：快干活！）<br></p>
          </article>
        </div>
        <section class="comment-content" id="comment-content">
          <h3 class="header__title">
            <span class="note__title">全部评论</span>
            <span class="note__num">15</span>
            <span :class="{ note__author: true, selected: authorSelected }" @click="authorHandle">只看作者</span>
            <span class="note__datetime" @click="datetimeHandle">
              时间排序
              <i :class="{ 'el-icon-sort-down': dateSelected, 'el-icon-sort-up': !dateSelected }"></i>
            </span>
          </h3>
          <brief-state>
            <brief-state-one @reply="replyOne">
              <brief-state-two @reply="replyTwo"></brief-state-two>
            </brief-state-one>
          </brief-state>
          <el-pagination
            background layout="prev, pager, next" :total="50"
            :page-size="10"
          >
          </el-pagination>
        </section>
        <comment @toComment="toComment" @emojiClick="emojiClick" ref="refComment"></comment>
        <back-top :target="target">
          <el-button icon="el-icon-caret-top" circle></el-button>
        </back-top>
        <focus-panel ref="refFocusPanel">
          <emoji-store @command="command"></emoji-store>
        </focus-panel>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
/**
 * 文章页面
 */
import { Vue, Component } from 'vue-property-decorator'
import Comment from '@/components/Comment'
import BackTop from '@/components/BackTop'
import BriefState from '@/components/BriefState/BriefState'
import BriefStateOne from '@/components/BriefState/BriefStateOne'
import BriefStateTwo from '@/components/BriefState/BriefStateTwo'
import FocusPanel from '@/components/FocusPanel'
import EmojiStore from '@/components/EmojiStore'

@Component({
  components: {
    Comment,
    BackTop,
    BriefState,
    BriefStateOne,
    BriefStateTwo,
    FocusPanel,
    EmojiStore
  }
})
class Article extends Vue {
  target = null
  authorSelected = false // 只看作者
  dateSelected = false // 时间排序
  fpshow = false

  mounted () {
    this.target = this.$refs.refVuescroll
  }

  authorHandle () {
    this.authorSelected = !this.authorSelected
  }
  
  datetimeHandle () {
    this.dateSelected = !this.dateSelected
  }

  // 滚动到评论区位置
  toComment () {
    this.$refs.refVuescroll.scrollIntoView('#comment-content', 500)
  }

  // 表情库点击事件
  emojiClick () {
    this.$refs.refFocusPanel.focus()
  }

  // 第一层的评论回复
  replyOne () {
    this.$refs.refComment.initInput('')
  }

  // 第二层的评论回复
  replyTwo () {
    this.$refs.refComment.initInput('@浅色年华 ')
  }

  // 点击表情包，在input中输入
  command (str) {
    this.$refs.refComment.appendInput(str, false)
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
.focusPanel {
  position: fixed;
  bottom: 50px;
  right: 50%;
  transform: translateX(350px);
  z-index: 101;
}
ul, li {
  list-style: none;
}
</style>
