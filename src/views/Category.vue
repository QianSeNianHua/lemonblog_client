<template>
  <div class="category">
    <vue-scroll>
      <div class="box">
        <div class="create">
          <span @click="createFolderHandle">
            <i class="el-icon-plus"></i>
            创建一个新的分类文件夹
          </span>
        </div>
        <template v-if="folderList.length !== 0">
          <folder-list
            @click.native="toCategoryDocs(item.folderId)" v-for="item in folderList" :key="item.folderId"
            :res="item" />
        </template>
        <template v-else>
          <div class="none_panel">
            <icon-svg icon-class="none" class="i-icon icon-none"></icon-svg>
            <span>页面空数据</span>
          </div>
        </template>
      </div>
    </vue-scroll>
    <dialog-new-folder :visible.sync="nfVisible" />
  </div>
</template>

<script>
/**
 * 分类页面
 */
import { Vue, Component, Watch } from 'vue-property-decorator'
import * as API from '@/api'
import FolderList from '@/components/FolderList'
import DialogNewFolder from '@/components/Dialog/DialogNewFolder'

@Component({
  components: {
    FolderList,
    DialogNewFolder
  }
})
class Category extends Vue {
  // 页码
  page = 1
  // 请求的数据
  res = {}
  // 创建新分类文件夹弹窗的显示隐藏
  nfVisible = false

  mounted () {
    this.getData(this.$route.params.userId)
  }

  @Watch('$route.params.userId')
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
  toCategoryDocs (folderId) {
    this.$router.push({ name: 'PanelCategoryDocs', params: { folderId } })
  }

  // 创建分类文件夹
  createFolderHandle () {
    this.nfVisible = true
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
.create {
  text-align: center;
  margin-left: 35px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
  color: #409EFF;

  &>span {
    cursor: pointer;
  }
}
</style>
