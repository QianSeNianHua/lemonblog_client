<template>
  <div class="box">
    <navbar />
    <div class="panel">
      <div class="panel-content">
        <folder-list />
        <folder-list />
        <folder-list />
        <folder-list />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 分类页面
 */
import Navbar from '@/components/Navbar'
import FolderList from '@/components/FolderList'

export default {
  name: 'Category',
  components: { Navbar, FolderList },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.box {
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
  overflow-x: hidden;
  overflow-y: scroll;
}
.panel-content {
  width: 730px;
  margin: 10px auto;
}
</style>
