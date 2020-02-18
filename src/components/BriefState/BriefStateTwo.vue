<template>
  <li class="briefStateTwo">
    <div class="info">
      <el-avatar icon="el-icon-user-solid"></el-avatar>
      <div class="userinfo">
        <span><span class="author">{{ res.userAll ? '作者 ' : '' }}</span>{{ res.nickname }}</span>
        <span>{{ createTime }}</span>
      </div>
    </div>
    <div class="text">
      <pre><a v-show="res.appointCommentId !== null">@{{ res.appointname }}</a>{{ res.content }}</pre>
    </div>
    <div class="feedback">
      <i class="el-icon-chat-dot-square" @click="reply('@' + res.nickname + ' ')">回复</i>
    </div>
  </li>
</template>

<script>
/**
 * 评论区 第二层li
 * @Prop res 评论数据
 * @event reply 回复评论
 */
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { handleDate } from '@/until/handleDate'

@Component()
class BriefStateTwo extends Vue {
  // 数据
  @Prop({ type: Object, default: {} })
  res

  // 评论回复
  @Emit()
  reply (val) {
    return val
  }

  // 处理后的日期
  get createTime () {
    const d = handleDate(this.res.createTime)

    return `${d.year}-${d.month}-${d.date} ${d.hourse}:${d.minutes}`
  }
}

export default BriefStateTwo
</script>

<style lang="less" scoped>
.briefStateTwo {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;

  &>.info {
    display: flex;
    flex-direction: row;

    &>.el-avatar {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
    }
    &>.userinfo {
      margin-left: 10px;
      display: flex;
      flex-direction: column;

      &>span:nth-child(1) {
        height: 20px;
        font-size: 15px;
        line-height: 20px;
        color: #404040;

        &>.author {
          font-size: 12px;
          color:#969696;
        }
      }
      &>span:nth-child(2) {
        height: 17px;
        font-size: 12px;
        line-height: 17px;
        margin-top: 2px;
        color: #969696;
      }
    }
  }
  &>.text {
    margin-top: 10px;

    &>pre {
      font-size: 16px;
      line-height: 24px;
      color: #404040;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    & a {
      color: #0681d0;
      margin-right: 10px;
      cursor: pointer;

      &:hover {
        color: #056bad;
      }
    }
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
</style>
