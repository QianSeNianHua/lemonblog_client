<template>
  <div class="categoryDocs">
    <back-page :content="'Javascript文件夹'" :to="{ name: 'PanelCategory' }"></back-page>
    <doc-brief></doc-brief>
    <div class="sidebar">
      <div class="sidebar-content">
        <div class="sidebar-content__title">分类</div>
        <div class="sidebar-content__scroll">
          <vue-scroll>
            <ul class="sidebar-content__ul">
              <li title="文件夹一">文件夹一fdsfdsfdsfdsfsdfds</li>
              <li>文件夹二</li>
              <li>文件夹一</li>
              <li>文件夹二</li>
              <li>文件夹一</li>
              <li>文件夹二</li>
              <li>文件夹一</li>
              <li>文件夹二</li>
            </ul>
          </vue-scroll>
        </div>
      </div>
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

export default {
  name: 'CategoryDocs',
  components: {
    BackPage,
    DocBrief
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
  &>.sidebar-content {
    height: 300px;
    background-color: white;
    box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 0.1);
    padding: 20px 10px;
    padding-right: 0px;
    cursor: default;

    &>.sidebar-content__title {
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      padding-bottom: 10px;
      margin-right: 10px;
      border-bottom: 1px solid #dcdfe6;
      margin-bottom: 10px;
    }
    &>.sidebar-content__scroll {
      width: 140px;
      height: calc(100% - 32px);
      overflow: hidden;
    }
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
ul, li {
  text-decoration: none;
}
ul.sidebar-content__ul {
  width: 130px;
  margin-right: 10px;
  cursor: default;

  &>li {
    width: 100%;
    height: 30px;
    line-height: 26px;
    font-size: 14px;
    color: #7f7f7f;
    padding: 2px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
      background-color: #DEEAF7;
    }
  }
}
</style>
