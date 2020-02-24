<template>
  <div class="dialogLogin">
    <el-dialog :visible.sync="visible">
      <template v-if="type === 'login'">
        <span slot="title">账号登录</span>
        <el-form :model="reqform">
          <el-form-item class="inputItem">
            <el-autocomplete
              v-model="reqform.account" placeholder="账号" :fetch-suggestions="querySearch"
              class="inputPanel"></el-autocomplete>
          </el-form-item>
          <el-form-item class="inputItem">
            <el-input
              v-model="reqform.password" placeholder="密码" show-password
              class="inputPanel"></el-input>
          </el-form-item>
          <div class="inputItem check">
            <el-checkbox>7天内自动登录</el-checkbox>
            <el-link :underline="false" @click="type = 'more'">
              更多
              <i class="el-icon-arrow-right"></i>
            </el-link>
          </div>
          <el-form-item class="inputItem btn">
            <el-button type="primary" @click="loginHandle">登录</el-button>
          </el-form-item>
          <div class="inputItem more">
            <span class="forget">忘记密码</span>
            <el-link type="primary" :underline="false">注册新账号</el-link>
          </div>
        </el-form>
      </template>
      <template v-if="type === 'more'">
        <span slot="title" class="header" @click="type = 'login'"><i class="el-icon-arrow-left"></i>更多登录方式</span>
        <div class="form-more">
          <div class="inputItem btn">
            <el-button type="primary"> <icon-svg icon-class="QQ" class="i-icon"></icon-svg> QQ账号</el-button>
          </div>
          <div class="inputItem btn">
            <el-button type="success" plain> <icon-svg icon-class="wechat" class="i-icon icon-wechat"></icon-svg> 微信账号</el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 弹框——登录
 * @param visible (被父组件调用)容器的显示隐藏
 */
import { Vue, Component } from 'vue-property-decorator'
import '@/icons/svg/QQ.svg'
import '@/icons/svg/wechat.svg'
import * as API from '@/api'

@Component
class DialogLogin extends Vue {
  // (被父组件调用)容器的显示隐藏
  visible = false

  // login登录，more更多登录，regist注册
  type = 'login'

  // 登录信息
  reqform = {
    nickname: '', // 昵称
    account: '', // 账号
    password: '' // 密码
  }

  // 账号输入建议
  querySearch (str, cb) {
    let res = window.localStorage.getItem('accounts') || '[]'

    try {
      res = JSON.parse(res)
    } catch (error) {
      res = []
    }

    cb(res)
  }

  // 登录操作
  loginHandle () {
    API.user.login(this.reqform.account, this.reqform.password).then(res => {

    })

    this.$message({
      message: '登录失败',
      type: 'error'
    })
  }
}

export default DialogLogin
</script>

<style lang="less" scoped>
.el-dialog__wrapper /deep/ .el-dialog {
  width: 360px;
}
.inputItem {
  width: 260px;
  height: 44px;
  margin: 0px auto;

  &:not(:first-child):not(.check):not(.btn):not(.more) {
    margin-top: 20px;
  }
}
.inputPanel /deep/ input {
  width: 260px;
  height: 44px;
}
.inputItem.check {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 20px;

  .el-checkbox {
    margin-right: 98px;
    float: left;

    & /deep/ .el-checkbox__input {
      line-height: normal;
    }
  }
  .el-link {
    float: right;
  }
}
.inputItem.btn {
  .el-button {
    width: 100%;
    height: 44px;
  }
}
.inputItem.more {
  height: 20px;
  margin-top: 10px;

  .forget {
    cursor: pointer;
    float: left;
  }
  .el-link {
    float: right;
  }
}
.form-more>.inputItem {
  &:not(:first-child) {
    margin-top: 20px;
  }

  .i-icon {
    float: left;
    font-size: 25px;
  }

  button {
    padding: 9.5px;
    padding-left: 10px;
    line-height: 25px;
  }
}
span.header {
  display: inline-block;
  height: 21px;
  line-height: 21px;
  cursor: pointer;

  &>i {
    padding-right: 5px;
    font-size: 21px;
    float: left;
  }
}
</style>
