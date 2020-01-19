<template>
  <div class="docPanel">
    <navbar :word.sync="word" @confirm="confirm" @dropdownCmd="dropdownCmd" />
    <div class="panel">
      <router-view />
    </div>
    <dialog-login ref="refDialogLogin"></dialog-login>
  </div>
</template>

<script>
/**
 * iframe
 */
import { Vue, Component, Ref } from 'vue-property-decorator'
import Navbar from '@/components/Navbar'
import DialogLogin from '@/components/DialogLogin'

@Component({
  components: {
    Navbar,
    DialogLogin
  }
})
class DocPanel extends Vue {
  // 搜索关键字
  word = ''

  @Ref()
  refDialogLogin

  // 确认搜索
  confirm () {
    console.log(this.word)
  }

  // 导航栏的下拉菜单的执行命令
  dropdownCmd (cmd) {
    if (cmd === 'login') {
      this.refDialogLogin.visible = true
    }
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
