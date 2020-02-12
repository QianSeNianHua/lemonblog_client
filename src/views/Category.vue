<template>
  <div class="category">
    <vue-scroll>
      <div class="box">
        <folder-list @to="toCategoryDocs" v-for="(item , i) in folderList" :key="i" />
      </div>
    </vue-scroll>
  </div>
</template>

<script>
/**
 * 分类页面
 */
import { Vue, Component, Watch } from 'vue-property-decorator'
import * as API from '@/api'
import FolderList from '@/components/FolderList'

@Component({
  components: {
    FolderList
  }
})
class Category extends Vue {
  // 页码
  page = 1

  // 请求的数据
  res = {}

  @Watch('$store.getters.getUserUUID')
  onUserUUIDChanged (nV, oV) {
    this.getData(nV, this.page)
  }

  // 获取列表
  get folderList () {
    return this.res.rows || []
  }

  getData (userUUID) {
    API.folder.getFolderList(userUUID, this.page).then(res => {
      if (res.code !== 0) return

      const data = res.data
      this.res = data
    })
  }

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
  margin: 0px auto 20px;
  padding-top: 20px;
}
</style>
