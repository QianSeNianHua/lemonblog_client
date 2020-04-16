<template>
  <div class="register">
    <p class="title">博客</p>
    <div class="panel">
      <span class="title back">
        <i class="el-icon-arrow-left" @click="toLoginHandle" />账号注册
      </span>
      <el-form :model="reqform" :rules="rules" ref="refRuleForm">
        <el-form-item class="inputItem" prop="nickname">
          <el-input
            v-model="reqform.nickname" placeholder="昵称" class="inputPanel"></el-input>
        </el-form-item>
        <el-form-item class="inputItem" prop="account">
          <el-input
            v-model="reqform.account" placeholder="账号" class="inputPanel"></el-input>
        </el-form-item>
        <el-form-item class="inputItem" prop="password">
          <el-input
            v-model="reqform.password" placeholder="密码" show-password
            class="inputPanel"></el-input>
        </el-form-item>
        <el-form-item class="inputItem" prop="rePassword">
          <el-input
            v-model="reqform.rePassword" placeholder="确认密码" show-password
            class="inputPanel"></el-input>
        </el-form-item>
        <el-form-item class="inputItem vercode" prop="vercode">
          <el-input
            class="inputPanel" v-model="reqform.vercode" placeholder="验证码"></el-input>
          <img src="">
        </el-form-item>
        <el-form-item class="inputItem btn">
          <el-button type="primary" @click="submitHandle">注册</el-button>
        </el-form-item>
        <div class="inputItem more">
          <span class="forget">点击“注册”即表示您同意并愿意遵守</span>
          <span>用户协议和隐私政策。</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
/**
 * 注册页面
 */
import { Vue, Component, Ref } from 'vue-property-decorator'
import '@/icons/svg/QQ.svg'
import '@/icons/svg/wechat.svg'
import * as API from '@/api'

@Component
class Register extends Vue {
  // login登录，more更多登录
  type = 'login'

  // 登录信息
  reqform = {
    nickname: '', // 昵称
    account: '', // 账号
    password: '', // 密码
    rePassword: '', // 确认密码
    vercode: '', // 验证码
    state: false // 七天免登录
  }

  // 校验规则
  rules = {
    nickname: [
      { required: true, message: '请输入昵称', trigger: 'blur' },
      { max: 10, message: '最大为10个字符', trigger: 'blur' }
    ],
    account: [
      { required: true, message: '请输入账号', trigger: 'blur' },
      { max: 18, message: '最多为18个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, message: '长度最少6位', trigger: 'blur' },
      { pattern: /^(?=.*[0-9])(?=.*(?:[^\d])).{6,}$/, message: '至少包含数字一种，大小写字母、特殊字符中的一种', trigger: 'blur' }
    ],
    rePassword: [
      { required: true, message: '密码不一致', trigger: 'blur' },
      { validator: this.valiPassword, trigger: 'blur' }
    ],
    vercode: [
      { required: true, message: '请输入验证码', trigger: 'blur' }
    ]
  }

  @Ref()
  refRuleForm

  // 确认密码校验
  valiPassword (rule, value, callback) {
    if (value !== this.reqform.password) {
      callback(new Error('密码不一致'))
    } else {
      callback()
    }
  }

  // 登录操作
  submitHandle () {
    this.refRuleForm.validate(valid => {
      if (!valid) return false

      API.user.login(this.reqform.account, this.reqform.password).then(res => {

      })
    })

    this.$message({
      message: '登录失败',
      type: 'error'
    })
  }

  // 跳转到登录页面
  toLoginHandle () {
    this.$router.replace({ name: 'Login' })
  }
}

export default Register
</script>

<style lang="less" scoped>
.register {
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
  img {
    margin-left: 30px;
    width: 100px;
    height: 44px;
    float: left;
  }
}
.inputItem.btn {
  margin-top: 22px;

  .el-button {
    width: 100%;
    height: 44px;
  }
}
.inputItem.more {
  margin-top: 10px;
  color: #969696;
  font-size: 12px;

  span {
    display: block;
    text-align: center;
    line-height: 20px;
    letter-spacing: 1px;
  }
}
</style>
