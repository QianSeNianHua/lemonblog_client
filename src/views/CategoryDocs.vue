<template>
  <div class="categoryDocs">
    <back-page :content="getFolderName" :to="{ name: 'PanelCategory' }"></back-page>
    <doc-brief :res="fileRes" v-if="fileRes.rows.length > 0"></doc-brief>
    <template v-else>
      <div class="none_panel">
        <icon-svg icon-class="none" class="i-icon icon-none"></icon-svg>
        <span>页面空数据</span>
      </div>
    </template>
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
  fileRes = { rows: [] }

  // 请求的分类列表数据
  folderRes = { rows: [] }

  mounted () {
    const userUUID = this.$route.params.id
    const fid = this.$route.params.fid

    this.getFileList(userUUID, fid)
    this.getFolderList(userUUID)
  }

  @Watch('$route.params')
  onUserUUIDChanged (nV, oV) {
    this.getFileList(nV.id, nV.fid)
    this.getFolderList(nV.id)
  }

  // 获取当前文件夹名称
  get getFolderName () {
    let t = this.folderRes.rows.filter(item => {
      return item.folderId + '' === this.$route.params.fid + ''
    })

    if (t.length > 0) {
      return t[0].folderName
    } else {
      return ''
    }
  }

  // 接口获取文件列表
  getFileList (userUUID, fid = '') {
    API.file.getFileList(userUUID, fid, this.page).then(res => {
      if (res.code !== 0) return

      const data = this.fileRes = res.data
    })
  }

  // 接口获取分类列表
  getFolderList (userUUID) {
    API.folder.getFolderList(userUUID, this.page).then(res => {
      if (res.code !== 0) return

      const data = this.folderRes = res.data
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
