<template>
  <div class="sidebarCatagory">
    <div class="sidebar-content__title">分类</div>
    <div class="sidebar-content__scroll">
      <vue-scroll>
        <ul class="sidebar-content__ul">
          <li
            :title="item.folderName" v-for="item in res.rows" :key="item.folderId"
            @click="toCategoryDocs(item.folderId)">
            {{ item.folderName }}
          </li>
        </ul>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
/**
 * 侧边栏的分类
 */
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component()
class SidebarCategory extends Vue {
  @Prop({ type: Object, default: {} })
  res

  // 跳转到指定的文件列表
  toCategoryDocs (folderId) {
    this.$router.push({ name: 'PanelCategoryDocs', params: { fid: folderId } })
  }
}

export default SidebarCategory
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
