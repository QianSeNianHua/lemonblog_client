<template>
  <div class="userInfo">
    <div class="content">
      <div class="info">
        <div class="top-time">
          <span>已使用100天</span>
        </div>
        <div class="avatar">
          <input-file
            src="" :value="file" :width="80"
            :height="80">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          </input-file>
        </div>
        <div class="avatar-nickname">{{ getUserInfo.nickname }}</div>
        <div class="avatar-account">5522896</div>
      </div>
      <div class="box">
        <div class="nickname">
          <nickname-modify :nickname.sync="getUserInfo.nickname" @confirm="nameConfirmHandle"></nickname-modify>
        </div>
      </div>
      <div class="box">
        <div class="line-top">个人简介</div>
        <div class="briefIntro">
          <brief-intro-modify :value.sync="getUserInfo.briefIntro" @confirm="introConfirmHandle"></brief-intro-modify>
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
import { Getter } from 'vuex-class'
import * as API from '@/api'
import InputFile from '@/components/InputFile'
import NicknameModify from '@/components/UserInfo/NicknameModify'
import BriefIntroModify from '@/components/UserInfo/BriefIntroModify'

@Component({
  components: {
    InputFile,
    NicknameModify,
    BriefIntroModify
  }
})
class UserInfo extends Vue {
  // 上传的文件
  file = ''
  // 用户昵称
  nickname = '许尊桐'
  // 个性签名
  briefIntro = ''

  @Getter
  getUserInfo

  // 修改昵称
  nameConfirmHandle (val) {
    this.apiModifyUserInfo(val, this.getUserInfo.briefIntro)
  }

  // 修改个人简介
  introConfirmHandle (val) {
    this.apiModifyUserInfo(this.getUserInfo.nickname, val)
  }

  // api，修改昵称和个人简介
  apiModifyUserInfo (nickname, briefIntro) {
    API.user.modifyUserInfo(nickname, briefIntro).then(res => {
      this.$message.success('修改成功')
    })
  }
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
  }
  .avatar-nickname {
    height: 20px;
    line-height: 20px;
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
