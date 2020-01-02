<template>
  <div class="sidebarCatagory">
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
</template>

<script>
/**
 * 侧边栏的分类
 */

export default {
  name: 'SidebarCategory'
}
</script>

<style lang="less" scoped>
.sidebarCatagory {
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
