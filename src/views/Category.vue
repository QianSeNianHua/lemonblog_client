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
            <checkbox v-model="item.checked" @change="(checked) => { cbChangeHandle(checked, item) }"></checkbox>
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
  // 右键菜单的位置
  contextPosi = {
    x: 0,
    y: 0
  }
  // 复选框被选中的数据
  cbCheckedData = { length: 0 }
  // 右键菜单数据
  contextData = [
    { label: '删除', color: 'red', cmd: 'delete', disable: false },
    { label: '修改', cmd: 'modify', disable: false }
  ]

  @Watch('$route.params.userId', { immediate: true })
  onUserUUIDChanged (nV, oV) {
    this.getData(nV)
  }

  @Watch('cbCheckedData.length', { immediate: true })
  onCbCheckedDataChanged (nV, oV) {
    let del = { label: '删除', color: 'red', cmd: 'delete', disable: true } // 有复选框
    let mod = { label: '修改', cmd: 'modify', disable: true } // 只能一个复选框
    let len = this.cbCheckedData.length

    if (len > 0) {
      del = { label: '删除', color: 'red', cmd: 'delete', disable: false }
    }
    if (len === 1) {
      mod = { label: '修改', cmd: 'modify', disable: false }
    }

    this.contextData = [del, mod]
  }

  @Ref()
  refFocusPanel

  @Getter
  getIsLogin

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
  menuHandle (event) {
    this.contextPosi.x = event.clientX || event.pageX || event.x
    this.contextPosi.y = event.clientY || event.pageY || event.y

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
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }

  // 修改
  cmdModify () {

  }

  // 复选框事件
  cbChangeHandle (checked, item) {
    if (checked) {
      this.cbCheckedData[item.folderId] = item
      this.cbCheckedData.length++
    } else {
      Reflect.deleteProperty(this.cbCheckedData, item.folderId)
      this.cbCheckedData.length--
    }
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
  // position: absolute;
  // top: 55px;
  // right: 20px;
  z-index: 101;
}
</style>
