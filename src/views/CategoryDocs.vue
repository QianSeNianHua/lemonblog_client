<template>
  <div class="categoryDocs">
    <back-page :content="'Javascript文件夹'" :to="{ name: 'PanelCategory' }"></back-page>
    <doc-brief></doc-brief>
    <div class="sidebar">
      <sidebar-category></sidebar-category>
      <button class="sidebar-button">
        <i class="el-icon-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
/**
 * 指定文件夹下的所有文章列表
 */
import BackPage from '@/components/BackPage'
import DocBrief from '@/views/DocBrief'
import SidebarCategory from '@/components/SidebarCategory'

export default {
  name: 'CategoryDocs',
  components: {
    BackPage,
    DocBrief,
    SidebarCategory
  }
}
</script>

<style lang="less" scoped>
.categoryDocs {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.backPage {
  position: absolute;
  top: 20px;
  left: 40px;
  z-index: 5;
}
.sidebar {
  position: absolute;
  top: 150px;
  left: 0px;
  transform: translateX(-150px);
  transition-duration: 0.5s;
  transition-property: all;
  transition-timing-function: ease;

  &:hover {
    transform: translateX(0);
  }
  &>.sidebar-button {
    width: 30px;
    height: 50px;
    border: 1px solid #dcdfe6;
    border-left: none;
    border-radius: 0px 5px 5px 0px;
    background-color: white;
    position: absolute;
    top: 0px;
    left: 150px;
    font-size: 20px;
    outline: none;
    cursor: pointer;
  }
}
</style>
