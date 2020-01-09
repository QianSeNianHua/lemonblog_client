<template>
  <div class="docPanel">
    <navbar :word.sync="word" @confirm="confirm" />
    <div class="panel">
      <router-view />
    </div>
  </div>
</template>

<script>
/**
 * iframe
 */
import { Vue, Component } from 'vue-property-decorator'
import Navbar from '@/components/Navbar'

@Component({
  components: {
    Navbar
  }
})
class DocPanel extends Vue {
  // 搜索关键字
  word = ''

  // 确认搜索
  confirm () {
    console.log(this.word)
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
