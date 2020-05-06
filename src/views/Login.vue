<template>
  <div class="login">
    <p class="title">博客</p>
    <div class="panel">
      <template v-if="type === 'login'">
        <span class="title">账号登录</span>
        <el-form :model="reqform" :rules="rules" ref="refRuleForm">
          <el-form-item class="inputItem" prop="account">
            <el-autocomplete
              v-model="reqform.account" placeholder="账号" :fetch-suggestions="querySearch"
              class="inputPanel"></el-autocomplete>
          </el-form-item>
          <el-form-item class="inputItem" prop="password">
            <el-input
              v-model="reqform.password" placeholder="密码" show-password
              class="inputPanel"></el-input>
          </el-form-item>
          <el-form-item class="inputItem vercode" prop="vercode">
            <el-input
              class="inputPanel" v-model="reqform.vercode" placeholder="验证码"></el-input>
            <div class="img" v-html="vercodeData" @click="getVerify"></div>
          </el-form-item>
          <div class="inputItem check">
            <el-checkbox v-model="reqform.state">7天内自动登录</el-checkbox>
            <el-link :underline="false" @click="type = 'more'">
              更多<i class="el-icon-arrow-right" />
            </el-link>
          </div>
          <el-form-item class="inputItem btn">
            <el-button type="primary" @click="submitHandle">登录</el-button>
          </el-form-item>
          <div class="inputItem more">
            <span class="forget">忘记密码</span>
            <el-link type="primary" :underline="false" @click="toRegisterHandle">注册新账号</el-link>
          </div>
        </el-form>
      </template>
      <template v-if="type === 'more'">
        <span class="title back" @click="type = 'login'"><i class="el-icon-arrow-left"></i>更多登录方式</span>
        <div class="form-more">
          <div class="inputItem btn">
            <el-button type="primary"> <icon-svg icon-class="QQ" class="i-icon"></icon-svg> QQ账号</el-button>
          </div>
          <div class="inputItem btn">
            <el-button type="success" plain> <icon-svg icon-class="wechat" class="i-icon icon-wechat"></icon-svg> 微信账号</el-button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
/**
 * 登录页面
 */
import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import '@/icons/svg/QQ.svg'
import '@/icons/svg/wechat.svg'
import * as API from '@/api'

@Component
class Login extends Vue {
  // login登录，more更多登录
  type = 'login'

  // 登录信息
  reqform = {
    account: '', // 账号
    password: '', // 密码
    vercode: '', // 验证码
    state: false // 七天免登录
  }
  // 验证码
  vercodeData = ''

  // 校验规则
  rules = {
    account: [
      { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    vercode: [
      { required: true, message: '请输入验证码', trigger: 'blur' }
    ]
  }

  created () {
    this.getVerify()
  }

  @Ref()
  refRuleForm

  @Watch('reqform.account')
  onAccountHandle (val, oldVal) {
    console.log(this)
  }

  // 账号输入建议
  querySearch (str, cb) {
    let res = window.localStorage.getItem('accounts') || '[]'

    try {
      res = JSON.parse(res)
    } catch (error) {
      res = []
    }

    // res = [{ value: '528627432' }]

    cb(res)
  }

  // 登录操作
  submitHandle () {
    this.refRuleForm.validate(valid => {
      if (!valid) return false

      API.user.login({
        account: this.reqform.account,
        password: this.reqform.password,
        verify: this.reqform.vercode,
        state: this.reqform.state
      }).then(res => {
        console.log(res)
      })
    })

    this.$message({
      message: '登录失败',
      type: 'error'
    })
  }

  // 跳转到注册页面
  toRegisterHandle () {
    this.$router.replace({ name: 'Register' })
  }

  // 获取验证码
  getVerify () {
    API.user.verify().then(res => {
      this.vercodeData = res.data

      console.log(res)
    })
  }
}

export default Login
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #F1F1F1;
  overflow: auto;
  cursor: default;

  &>.title {
    font-size: 50px;
    font-weight: bold;
    color: #409EFF;
    margin: 50px 0px 50px 50px;
  }
}
.panel {
  width: 400px;
  margin: 60px auto 60px;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0,0,0,.1);
  background-color: white;

  &>.title {
    color: #969696;
    font-size: 18px;
    display: inline-block;

    &.back>i {
      padding-right: 5px;
      font-size: 21px;
      float: left;
      cursor: pointer;

      &::before {
        vertical-align: middle;
      }
    }
  }
  &>.el-form {
    margin-top: 50px;
  }
}
.inputItem {
  width: 300px;
  height: 44px;
  margin: 0px auto;

  &:not(:first-child):not(.check):not(.btn):not(.more) {
    margin-top: 22px;
  }
}
.inputPanel /deep/ input {
  width: 300px;
  height: 44px;
}
.inputItem.vercode {
  /deep/ .el-input, /deep/ input {
    width: 170px;
    height: 44px;
    float: left;
  }
  .img {
    border: 1px solid #ccc;
    margin-left: 30px;
    width: 100px;
    height: 40px;
    float: left;
    cursor: pointer;
  }
}
.inputItem.check {
  margin-top: 20px;
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
.form-more {
  margin-top: 50px;
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
</style>
