<template>
  <div class="userInfo">
    <div class="content">
      <div class="info">
        <div class="top-time">
          <span>已使用100天</span>
        </div>
        <div class="avatar">
          <el-avatar src="http://empty">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          </el-avatar>
        </div>
        <div class="avatar-nickname">许尊桐</div>
        <div class="avatar-account">5522896</div>
      </div>
      <div class="box">
        <div class="nickname">
          <span>许尊桐</span>
          <a>修改</a>
        </div>
      </div>
      <div class="box">
        <div class="line-top">个性签名</div>
        <div class="briefIntro">
          <span>你好，这是我的签名</span>
          <a>设置</a>
        </div>
      </div>
      <div class="box">
        <div class="line-top">安全设置</div>
        <div class="password">
          <span>修改密码</span>
          <a>修改</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 个人中心
 */
import { Vue, Component } from 'vue-property-decorator'
import * as API from '@/api'

@Component
class UserInfo extends Vue {

}

export default UserInfo
</script>

<style lang="less" scoped>
.userInfo {
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  overflow: auto;
}
.content {
  width: 700px;
  margin: 50px auto 56px;
}
.info {
  border: 1px solid #e7e9eb;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  background-color: white;
  padding-bottom: 24px;

  .top-time {
    margin: 16px 23px 0px;
    overflow: hidden;

    &>span {
      font-size: 12px;
      line-height: 12px;
      color: #afafaf;
      float: right;
    }
  }
  .avatar {
    height: 112px;
    padding-top: 16px;
    padding-bottom: 16px;
    text-align: center;

    .el-avatar {
      width: 80px;
      height: 80px;
      cursor: pointer;
    }
  }
  .avatar-nickname {
    margin: 12px 0px 8px;
    font-size: 18px;
    font-weight: bold;
    color: #383838;
    text-align: center;
  }
  .avatar-account {
    font-size: 12px;
    color: #666;
    text-align: center;
    padding-bottom: 24px;
  }
}
.box {
  border: 1px solid #e7e9eb;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  background-color: white;
  margin-top: 12px;
  padding: 0px 30px;

  &>.line-top {
    margin-top: 30px;
    font-size: 14px;
    color: #969696;
  }
  .nickname, .briefIntro, .password {
    font-size: 16px;
    color: #383838;
    margin: 30px 0px;
    overflow: hidden;

    &>span {
      float: left;
    }
    &>a {
      float: right;
      cursor: pointer;
      color: #2e68f8;
    }
  }
}
</style>
