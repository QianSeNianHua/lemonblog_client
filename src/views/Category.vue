<template>
  <div class="category">
    <vue-scroll>
      <div class="box">
        <folder-list @to="toCategoryDocs" />
        <folder-list />
        <folder-list />
        <folder-list />
        <folder-list />
        <folder-list />
        <folder-list />
        <folder-list />
        <folder-list />
        <folder-list />
        <folder-list />
        <folder-list />
        <folder-list />
        <folder-list />
        <folder-list />
        <folder-list />
        <folder-list />
        <folder-list />
        <folder-list />
      </div>
    </vue-scroll>
  </div>
</template>

<script>
/**
 * 分类页面
 */
import { Vue, Component } from 'vue-property-decorator'
import FolderList from '@/components/FolderList'

@Component({
  components: {
    FolderList
  }
})
class Category extends Vue {
  toCategoryDocs () {
    this.$router.push({ name: 'PanelCategoryDocs' })
  }
}
export default Category
</script>

<style lang="less" scoped>
.category {
  height: 100%;
}
.box {
  width: 730px;
  margin: 20px auto;
}
</style>
