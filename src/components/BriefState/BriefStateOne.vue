<template>
  <li class="briefStateOne">
    <el-avatar icon="el-icon-user-solid"></el-avatar>
    <div class="content">
      <div class="nickname"><span class="author">{{ res.userAll ? '作者 ' : '' }}</span>{{ res.nickname }}</div>
      <div class="datetime">
        <span class="floor">{{ res.floor }}楼 </span>
        <span class="date">{{ createTime }}</span>
      </div>
      <div
        class="text" v-text="res.content">
      </div>
      <div class="feedback">
        <i class="el-icon-chat-dot-square" @click="reply('@' + res.nickname + ' ')">回复</i>
      </div>
      <ul class="child-ul">
        <slot></slot>
      </ul>
    </div>
  </li>
</template>

<script>
/**
 * 评论区 第一层li
 * @Prop res 评论数据
 * @event reply 回复评论
 */
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { handleDate } from '@/until/handleDate'

@Component()
class BriefStateOne extends Vue {
  // 数据
  @Prop({ type: Object, default: { child: [] } })
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

export default BriefStateOne
</script>

<style lang="less" scoped>
ul, li {
  list-style: none;
}
.briefStateOne {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  &>.el-avatar {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
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

      &>.author {
        font-size: 12px;
        color:#969696;
      }
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
</style>
