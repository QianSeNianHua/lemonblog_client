<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { Vue, Component, Ref } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import * as API from '@/api'

@Component
class App extends Vue {
  created () {
    const token = window.localStorage.getItem('token')
    const routeName = this.$route.name

    if (!token) {
      this.setToken('')
      this.setUserInfo({})
      this.setIsLogin(false)

      return
    }
    this.setToken(token)

    if (routeName === 'Login') return

    this.apiUserInfo()
  }

  @Action
  setToken

  @Action
  setIsLogin

  @Action
  setUserInfo

  @Getter
  getIsLogin

  // 获取用户信息
  apiUserInfo (token) {
    API.user.inUserInfo().then(res => {
      if (res.code === 0) {
        this.setUserInfo(res.data)
        this.setIsLogin(true)
      }
    }).catch(_error => {
      this.setToken('')
      this.setUserInfo({})
      this.setIsLogin(false)
    })
  }
}

export default App
</script>

<style>
html, body, #app, * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system,BlinkMacSystemFont,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;
}
html, body, #app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.none_panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5%;
}
.none_panel>.i-icon.icon-none {
  font-size: 300px;
}
.none_panel>span {
  margin-top: 20px;
  font-size: 16px;
  color: #999;
}
</style>
