<template>
  <div class="category">
    <vue-scroll>
      <div class="box">
        <template v-if="folderList.length !== 0">
          <folder-list
            @click.native="toCategoryDocs(item.folderId)" v-for="item in folderList" :key="item.folderId"
            :res="item"
          />
        </template>
        <template v-else>
          <div class="none_panel">
            <icon-svg icon-class="none" class="i-icon icon-none"></icon-svg>
            <span>页面空数据</span>
          </div>
        </template>
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
import none from '@/icons/svg/none.svg'

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

  mounted () {
    const userUUID = this.$store.getters.getUserUUID

    if (userUUID) {
      this.getData(userUUID)
    }
  }

  @Watch('$store.getters.getUserUUID')
  onUserUUIDChanged (nV, oV) {
    this.getData(nV)
  }

  // 获取列表
  get folderList () {
    return this.res.rows || []
  }

  // 接口获取分类列表
  getData (userUUID) {
    API.folder.getFolderList(userUUID, this.page).then(res => {
      if (res.code !== 0) return

      const data = res.data
      this.res = data
    })
  }

  // 文件夹的点击事件
  toCategoryDocs (fid) {
    this.$router.push({ name: 'PanelCategoryDocs', params: { fid } })
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
.none_panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5%;

  &>.i-icon.icon-none {
    font-size: 300px;
  }
  &>span {
    margin-top: 20px;
    font-size: 16px;
    color: #999;
  }
}
</style>
