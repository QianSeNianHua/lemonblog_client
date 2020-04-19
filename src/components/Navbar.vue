<template>
  <div class="navbar">
    <div class="box">
      <div class="left_panel">
        <div class="nickname" @click="toHome">博客</div>
        <el-menu mode="horizontal" :default-active="routeIndex" :router="true">
          <el-menu-item index="/" :route="{ name: 'Home', params: { userId: userUUID } }">首页</el-menu-item>
          <el-menu-item index="/category" :route="{ name: 'PanelCategory', params: { userId: userUUID } }">分类</el-menu-item>
          <el-menu-item index="/docBrief" :route="{ name: 'PanelDocBrief', params: { userId: userUUID } }">文档</el-menu-item>
          <el-menu-item index="/openSource">我的开源</el-menu-item>
        </el-menu>
      </div>
      <div class="right_panel">
        <el-input placeholder="搜索" v-model="SyncedWord" @keyup.native.enter="confirm">
          <i slot="suffix" class="el-input__icon el-icon-search btn-search" @click="confirm" />
        </el-input>
        <el-avatar icon="el-icon-user-solid" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" @mousedown.native.prevent="dropdownMenu" />
      </div>
      <focus-panel
        ref="refFocusPanel" :trans="'top'" trigger="unilateral">
        <context-menu width="160px" :data="menuData" @command="dropdownCmd"></context-menu>
      </focus-panel>
    </div>
  </div>
</template>

<script>
/**
 * 导航栏
 * @param :word.sync 搜索关键字
 * @event @confirm 确认搜索
 * @event @dropdownCmd 头像的下拉菜单的执行命令
 */
import { Vue, Component, PropSync, Emit, Ref, Watch } from 'vue-property-decorator'
import * as API from '@/api'
import { handleDate } from '@/until/handleDate'
import FocusPanel from '@/components/FocusPanel/FocusPanel'
import ContextMenu from '@/components/FocusPanel/ContextMenu'

@Component({
  components: {
    FocusPanel,
    ContextMenu
  }
})
class Navbar extends Vue {
  // 搜索关键字
  @PropSync('word', { type: String })
  SyncedWord

  // 接口数据
  res = {}

  // 获取路由名字，设置当前导航索引
  get routeIndex () {
    const name = this.$route.name

    if (name === 'PanelCategory') {
      return '/category'
    } else if (name === 'PanelCategoryDocs') {
      return '/category'
    } if (name === 'PanelArticle') {
      return '/docBrief'
    } else if (name === 'PanelDocBrief') {
      return '/docBrief'
    } else {
      return this.$route.path
    }
  }

  // 获取菜单
  get menuData () {
    let createTime = handleDate(new Date(this.res.createTime))
    let time = `${createTime.year}-${createTime.month}-${createTime.date}`

    return [
      { label: this.res.nickname },
      { hr: true },
      { label: '个人中心', cmd: 'info' },
      { hr: true },
      { label: '登录/注册', color: '#67c23a', cmd: 'login' },
      { label: '退出账号', color: '#f56c6c', cmd: 'logout' }
    ]
  }

  // 获取用户id
  get userUUID () {
    return this.$store.getters.getUserUUID
  }

  @Watch('$route.params.userId', { immediate: true })
  onRouteChanged (to, from) {
    this.getUserUUID(this.$route.params.userId)
  }

  // 接口获取用户信息
  getUserUUID (userUUID) {
    API.user.userInfo(userUUID).then(res => {
      if (res.code !== 0) return

      const data = res.data

      if (Reflect.ownKeys(data).length > 0) {
        this.res = data

        this.$store.dispatch('setUserUUID', userUUID)
        this.$store.dispatch('setUserInfo', data)
      } else {
        // 查找不到用户
        this.$router.replace({ name: 'NotFound' })
      }
    })
  }

  // 跳转到首页
  toHome () {
    this.$router.push({ name: 'Home', params: { id: this.userUUID } })
  }

  // 确认搜索
  @Emit()
  confirm () {
  }

  @Ref()
  refFocusPanel

  // 头像的下拉菜单的显示隐藏
  dropdownMenu (event) {
    if (event.which !== 1) return

    if (this.refFocusPanel.visible) {
      this.refFocusPanel.blur()
    } else {
      this.refFocusPanel.focus()
    }
  }

  // 头像的下拉菜单的执行命令
  @Emit('dropdownCmd')
  dropdownCmd (cmd) {
    if (cmd) {
      this.refFocusPanel.blur()

      return cmd
    }
  }
}

export default Navbar
</script>

<style lang="less" scoped>
.navbar {
  z-index: 100;
}
.box {
  height: 60px;
  user-select: none;
  // border-bottom: solid 1px #e6e6e6;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  position: relative;
}
.left_panel {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-shrink: 0;

  .nickname {
    height: 100%;
    margin: 0px 30px;
    text-align: center;
    line-height: 60px;
    font-size: 25px;
    font-weight: bold;
    color: #409EFF;
    cursor: pointer;
  }
  .el-menu {
    display: inline-block;

    &.el-menu--horizontal {
      border: none;
    }
  }
}
.right_panel {
  height: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  .el-input {
    border-radius: 20px;
    overflow: hidden;
    margin-right: 20px;

    /deep/ input {
      transition-property: width, padding;
      transition-duration: 0.7s;
      transition-timing-function: ease;
      width: 40px;
      padding-right: 23px;
      padding-left: 15px;
      border-radius: 20px;
    }
    &:hover /deep/ input {
      width: 220px;
      padding-left: 15px;
      padding-right: 40px;
    }
    /deep/ input:focus {
      width: 220px;
      padding-left: 15px;
      padding-right: 40px;
    }
    /deep/.el-input__suffix {
      width: 38px;
      height: 38px;
      top: 1px;
      right: 1px;
    }
  }
  .btn-search {
    width: 100%;
    height: 100%;
    cursor: pointer;
    flex-shrink: 0;
  }
  .el-avatar {
    width: 45px;
    height: 45px;
    cursor: pointer;
    margin-right: 25px;
    flex-shrink: 0;
    font-size: 30px;
  }
}
.focusPanel {
  top: 55px !important;
  right: 10px !important;
  left: initial !important;
  z-index: 101;
}
</style>
