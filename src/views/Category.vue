<template>
  <div class="category">
    <vue-scroll>
      <div class="box">
        <div class="create" v-if="getIsLogin">
          <span @click="createFolderHandle">
            <i class="el-icon-plus"></i>
            创建一个新的分类文件夹
          </span>
        </div>
        <template v-if="res.length !== 0">
          <div v-for="item in res" :key="item.folderId" class="folderPanel">
            <folder-list @click.native="toCategoryDocs(item.folderId)" :res="item" @contextmenu.native.prevent="menuHandle($event, item)" />
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
    <dialog-new-folder
      :visible.sync="dlNewFolder.visible" @confirm="confirmHandle" :title="dlNewFolder.title"
      :res="dlNewFolder.res" />
    <focus-panel
      ref="refFocusPanel" trans="top" trigger="bilateral"
      :x="contextPosi.x" :y="contextPosi.y">
      <context-menu :data="contextData" @command="dropdownCmd"></context-menu>
    </focus-panel>
  </div>
</template>

<script>
/**
 * 分类页面
 */
import { Vue, Component, Watch, Ref } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import * as API from '@/api'
import FolderList from '@/components/FolderList'
import DialogNewFolder from '@/components/Dialog/DialogNewFolder'
import FocusPanel from '@/components/FocusPanel/FocusPanel'
import ContextMenu from '@/components/FocusPanel/ContextMenu'

@Component({
  components: {
    FolderList,
    DialogNewFolder,
    FocusPanel,
    ContextMenu
  }
})
class Category extends Vue {
  // 页码
  page = 1
  // 请求的数据
  res = []
  // 弹窗信息
  dlNewFolder = {
    visible: false, // 弹窗的显示隐藏
    title: '', // 弹窗标题
    res: { // 数据
      thumbnailURL: '',
      folderName: ''
    }
  }
  // 右键菜单的位置
  contextPosi = {
    x: 0,
    y: 0
  }
  // 右键菜单数据
  contextData = [
    { label: '删除', color: 'red', cmd: 'delete', disable: false },
    { label: '修改', cmd: 'modify', disable: false }
  ]
  // 当前被选中的项
  activeFolder = {}

  @Watch('$route.params.userId', { immediate: true })
  onUserUUIDChanged (nV, oV) {
    this.apiFolderList(nV)
  }

  @Ref()
  refFocusPanel

  @Getter
  getIsLogin

  @Getter
  getUserInfo

  // 文件夹的点击事件
  toCategoryDocs (folderId) {
    this.$router.push({ name: 'PanelCategoryDocs', params: { folderId } })
  }

  // folderList的右键菜单事件
  menuHandle (event, item) {
    this.contextPosi.x = event.clientX || event.pageX || event.x
    this.contextPosi.y = event.clientY || event.pageY || event.y
    this.activeFolder = { ...item }

    this.refFocusPanel.focus()
  }

  // 右键菜单执行命令
  dropdownCmd (cmd) {
    this.refFocusPanel.blur()

    switch (cmd) {
      case 'delete':
        this.cmdDelete()
        break
      case 'modify':
        this.cmdModify()
        break
      default:
        break
    }
  }

  // 删除
  cmdDelete () {
    this.$confirm('将删除文件夹里所有的文件，是否继续？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.apiDeleteFolder(this.activeFolder.folderId)
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }

  // 修改
  cmdModify () {
    this.dlNewFolder.title = '修改分类文件夹'
    this.dlNewFolder.res = {
      thumbnailURL: this.activeFolder.thumbnailURL,
      folderName: this.activeFolder.folderName
    }
    this.dlNewFolder.visible = true
  }

  // 确认新建文件夹
  confirmHandle (formData) {
    if (this.activeFolder.folderId) {
      formData.append('folderId', this.activeFolder.folderId)
    }
    this.apiCreateFolder(formData)
  }

  // 显示弹窗，新建文件夹
  createFolderHandle () {
    this.dlNewFolder.title = '新建分类文件夹'
    this.dlNewFolder.res = {
      thumbnailURL: '',
      folderName: ''
    }
    this.activeFolder = {}
    this.dlNewFolder.visible = true
  }

  // 接口获取分类列表
  apiFolderList (userUUID) {
    API.folder.getFolderList(userUUID, this.page).then(res => {
      if (res.code !== 0) return

      this.res = res.data.rows
    })
  }

  // 接口，创建分类文件夹
  apiCreateFolder (formData) {
    API.folder.createFolder(formData, progress => {
      console.log(progress)
    }).then(res => {
      this.dlNewFolder.visible = false

      this.$message.success(res.msg)

      this.apiFolderList(this.getUserInfo.userUUID)
    })
  }

  // 接口，删除分类文件夹
  apiDeleteFolder (folderId) {
    API.folder.deleteFolder(folderId).then(res => {
      this.$message({
        type: 'success',
        message: '删除成功!'
      })

      this.apiFolderList(this.getUserInfo.userUUID)
    })
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
  .folderList {
    width: initial;
    margin-left: 30px;
  }
}
.focusPanel {
  // position: absolute;
  // top: 55px;
  // right: 20px;
  z-index: 101;
}
</style>
