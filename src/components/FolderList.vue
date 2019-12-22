<template>
  <div class="folderList">
    <img src="http://www.baidu.com" class="icon">
    <div class="content">
      <span class="text">Javascript文件夹</span>
      <span class="num">30篇</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FolderList'
}
</script>

<style lang="less" scoped>
.folderList {
  width: 100%;
  height: 120px;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 15px;
  }
}
img.icon {
  display: block;
  width: 70px;
  height: 70px;
  background-color: #efefef;
  position: absolute;
  top: 0px;
  left: 0px;
  margin: 25px 0px;
}
.content {
  height: 100%;
  margin-left: 35px;
  background-color: lightskyblue;
  padding: 25px;
  padding-left: 70px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);

  &>.text {
    font-size: 27px;
    font-weight: 500;
    line-height: 70px;
  }
  &>.num {
    float: right;
    line-height: 70px;
  }
}
</style>
