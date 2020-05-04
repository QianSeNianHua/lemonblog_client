<template>
  <div class="docPanel">
    <navbar :word.sync="word" @confirm="confirm" @dropdownCmd="dropdownCmd" />
    <div class="panel">
      <router-view />
    </div>
  </div>
</template>

<script>
/**
 * iframe
 */
import { Vue, Component, Ref } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import * as API from '@/api'
import Navbar from '@/components/Navbar'

@Component({
  components: {
    Navbar
  }
})
class DocPanel extends Vue {
  // 搜索关键字
  word = ''

  @Ref()
  refDialogLogin

  @Action
  setToken

  @Action
  setIsLogin

  @Action
  setUserInfoStorage

  @Getter
  getUserInfo

  // 确认搜索
  confirm () {
    console.log(this.word)
  }

  // 导航栏的下拉菜单的执行命令
  dropdownCmd (cmd) {
    if (cmd === 'login') {
      // 登录注册
      this.$router.push({ name: 'Login' })
    } else if (cmd === 'logout') {
      // 退出账号
      this.logout()
    } else if (cmd === 'info') {
      // 个人中心
      this.$router.push({ name: 'UserInfo', params: { userId: this.getUserInfo.userUUID } })
    }
  }

  // 退出账号
  logout () {
    this.setToken('')
    this.setIsLogin(false)
    this.setUserInfoStorage({})

    this.$router.push({ name: 'Login' })
  }
}

export default DocPanel
</script>

<style lang="less" scoped>
.docPanel {
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  overflow: hidden;
  position: relative;
}
.navbar {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 100px;
}
.panel {
  position: absolute;
  top: 60px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
}
</style>
