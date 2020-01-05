<template>
  <li class="briefStateOne">
    <el-avatar icon="el-icon-user-solid"></el-avatar>
    <div class="content">
      <div class="nickname">浅色年华</div>
      <div class="datetime">
        <span class="floor">1楼</span>
        <span class="date">2019.01.31 15:34</span>
      </div>
      <div
        class="text" v-text="`你这标题，泳装就大尺度。。网友也有够傻批的，
                  人家都陪着父亲化疗多久了，人家早就做好面对她父亲离开的准备了，我也相信李咏也希望她能尽早站起来过好自己的人生。要记住，时间不会因为谁死了而停止，地球也只会一直转，就算你亲人离开了你，你周围的人前一秒还在为你伤心，后一秒就欢快的玩耍了。`"
      >
      </div>
      <div class="feedback">
        <i class="el-icon-chat-dot-square" @click="$emit('reply')">回复</i>
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
 * @event reply 回复评论
 */

export default {
  name: 'BriefStateOne'
}
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
