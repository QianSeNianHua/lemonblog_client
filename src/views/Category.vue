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
        <template v-if="res.length !== 0">
          <div v-for="item in res" :key="item.folderId" class="folderPanel">
            <checkbox v-model="item.checked"></checkbox>
            <folder-list @click.native="toCategoryDocs(item.folderId)" :res="item" @contextmenu.native.prevent="menuHandle" />
          </div>
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
    <focus-panel ref="refFocusPanel" trans="top" @afterBlur="afterBlurHandle">
      <context-menu :data="contextData"></context-menu>
    </focus-panel>
  </div>
</template>

<script>
/**
 * 分类页面
 */
import { Vue, Component, Watch, Ref } from 'vue-property-decorator'
import * as API from '@/api'
import FolderList from '@/components/FolderList'
import DialogNewFolder from '@/components/Dialog/DialogNewFolder'
import Checkbox from '@/components/Checkbox'
import FocusPanel from '@/components/FocusPanel/FocusPanel'
import ContextMenu from '@/components/FocusPanel/ContextMenu'

@Component({
  components: {
    FolderList,
    DialogNewFolder,
    Checkbox,
    FocusPanel,
    ContextMenu
  }
})
class Category extends Vue {
  // 页码
  page = 1
  // 请求的数据
  res = []
  // 创建新分类文件夹弹窗的显示隐藏
  nfVisible = false
  // 右键菜单数据
  contextData = [
    { label: '删除', color: 'red', cmd: 'delete' }
  ]

  @Watch('$route.params.userId', { immediate: true })
  onUserUUIDChanged (nV, oV) {
    this.getData(nV)
  }

  @Ref()
  refFocusPanel

  // 接口获取分类列表
  getData (userUUID) {
    API.folder.getFolderList(userUUID, this.page).then(res => {
      if (res.code !== 0) return

      this.res = res.data.rows.map(item => {
        item.checked = false

        return item
      })
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

  // folderList的右键菜单事件
  menuHandle (e) {
    this.refFocusPanel.focus()
  }

  afterBlurHandle () {
    console.log(123)
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
.folderPanel {
  position: relative;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
  &>.checkbox {
    position: absolute;
    top: 53px;
  }
  .folderList {
    width: initial;
    margin-left: 30px;
  }
}
.focusPanel {
  position: absolute;
  top: 55px;
  right: 20px;
  z-index: 101;
}
</style>
