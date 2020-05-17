<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import * as API from '@/api'

const nonePage = ['Login', 'Register', 'ArticleEditor', 'NotFound']

@Component
class App extends Vue {
  async created () {
    console.log(123)
    const token = window.localStorage.getItem('token')
    const routeName = this.$route.name
    const userUUID = this.$route.params.userId

    token ? this.setToken(token) : this.setToken('')

    // 地址参数不包含userId
    if (nonePage.indexOf(routeName) !== -1) return

    if (token) await this.apiUserInfoIn()

    if (userUUID) {
      await this.apiUserInfo(userUUID)
    }
  }

  @Action
  setToken

  @Action
  setIsLogin

  @Action
  setUserInfo

  @Getter
  getIsLogin

  @Getter
  getUserInfo

  @Watch('$route.params.userId')
  onUserIdChanged (nV, oV) {
    if (this.getIsLogin && nV !== undefined && nV !== this.getUserInfo.userUUID) {
      // 不允许查看普通用户
      this.$router.replace({ name: 'NotFound' })
    } else if (nV !== undefined) {
      this.apiUserInfo(nV)
    }
  }

  // 获取登录用户信息
  apiUserInfoIn () {
    return new Promise((resolve, reject) => {
      API.user.inUserInfo().then(res => {
        this.setUserInfo(res.data)
        this.setIsLogin(true)
      }).catch(_error => {
        this.setToken('')
        this.setIsLogin(false)

        resolve()
      })
    })
  }

  // 获取普通用户信息
  apiUserInfo (userUUID) {
    return new Promise((resolve, reject) => {
      API.user.userInfo(userUUID).then(res => {
        const data = res.data

        this.setUserInfo(res.data)

        if (Object.keys(data).length === 0) this.$router.push({ name: 'NotFound' })
      })
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
