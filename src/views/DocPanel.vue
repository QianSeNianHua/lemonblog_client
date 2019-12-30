<template>
  <div class="docPanel">
    <navbar v-model="word" />
    <div class="panel">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'DocPanel',
  components: { Navbar },
  data () {
    return {
      // 搜索的关键字
      word: ''
    }
  }
}
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
