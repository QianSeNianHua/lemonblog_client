<template>
  <li class="briefStateTwo">
    <div class="info">
      <el-avatar icon="el-icon-user-solid"></el-avatar>
      <div class="userinfo">
        <span>浅色年华</span>
        <span>2019.01.31 15:34</span>
      </div>
    </div>
    <div class="text">
      <pre><a>@浅色年华</a>你这标题，泳装就大尺度。。网友也有够傻批的，
                人家都陪着父亲化疗多久了，人家早就做好面对她父亲离开的准备了，我也相信李咏也希望她能尽早站起来过好自己的人生。要记住，时间不会因为谁死了而停止，地球也只会一直转，就算你亲人离开了你，你周围的人前一秒还在为你伤心，后一秒就欢快的玩耍了。</pre>
    </div>
    <div class="feedback">
      <i class="el-icon-chat-dot-square" @click="$emit('reply')">回复</i>
    </div>
  </li>
</template>

<script>
/**
 * 评论区 第二层li
 */

export default {
  name: 'BriefStateTwo'
}
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
