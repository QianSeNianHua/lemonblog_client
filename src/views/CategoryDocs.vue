<template>
  <div class="categoryDocs">
    <back-page :content="folderName" :to="{ name: 'PanelCategory' }"></back-page>
    <doc-brief :res="fileRes"></doc-brief>
    <div class="sidebar">
      <sidebar-category :res="folderRes"></sidebar-category>
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
import { Vue, Component, Watch } from 'vue-property-decorator'
import * as API from '@/api'
import BackPage from '@/components/BackPage'
import DocBrief from '@/views/DocBrief'
import SidebarCategory from '@/components/SidebarCategory'

@Component({
  components: {
    BackPage,
    DocBrief,
    SidebarCategory
  }
})
class CategoryDocs extends Vue {
  // 页码
  page = 1

  // 请求的文件列表数据
  fileRes = {}

  // 请求的分类列表数据
  folderRes = {}

  // 文件夹名称
  folderName = ''

  mounted () {
    const userUUID = this.$store.getters.getUserUUID

    if (userUUID) {
      this.getFileList(userUUID)
      this.getFolderList(userUUID)
    }
  }

  @Watch('$store.getters.getUserUUID')
  onUserUUIDChanged (nV, oV) {
    this.getFileList(nV)
    this.getFolderList(nV)
  }

  @Watch('$route.params.fid')
  onFidChanged (nV, oV) {
    const userUUID = this.$store.getters.getUserUUID

    if (userUUID) {
      this.getFileList(userUUID)
      this.getFolderList(userUUID)
    }
  }

  // 获取当前文件夹名称
  get getFolderName () {
    let t = this.folderRes.rows.filter(item => {
      return item.folderId === this.$route.params.fid
    })

    if (t.length > 0) {
      return t[0].folderName
    } else {
      return ''
    }
  }

  // 接口获取文件列表
  getFileList (userUUID) {
    API.file.getFileList(userUUID, this.$route.params.fid || '', this.page).then(res => {
      if (res.code !== 0) return

      const data = this.fileRes = res.data
    })
  }

  // 接口获取分类列表
  getFolderList (userUUID) {
    API.folder.getFolderList(userUUID, this.page).then(res => {
      if (res.code !== 0) return

      const data = this.folderRes = res.data

      // 获取文件夹名称
      data.rows.some(item => {
        if (item.folderId + '' === this.$route.params.fid + '') {
          this.folderName = item.folderName

          return true
        }
      })
    })
  }
}

export default CategoryDocs
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
