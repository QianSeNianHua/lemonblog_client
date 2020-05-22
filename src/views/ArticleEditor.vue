<template>
  <div class="articleEditor">
    <div class="articlePanel">
      <el-drawer :visible.sync="drawerShow" direction="ltr" size="500">
        <div class="drawerContent">
          <sidebar-folder-list
            :res="folderRes.rows" :active-index.sync="actFolderIndex" @selected="folderSelHandle"
            @create="folderCreHandle"
            @command="cmdFolderHandle"></sidebar-folder-list>
          <sidebar-doc-list
            :res="fileRes.rows" :active-index.sync="actFileIndex" @create="fileCreHandle"
            @selected="fileSelHandle"></sidebar-doc-list>
        </div>
      </el-drawer>
      <div class="topNavbar">
        <div id="ckToolbar" class="ckToolbar"></div>
        <div class="rightGroup">
          <el-tooltip effect="dark" content="侧边栏" placement="bottom">
            <span @click="drawerShow = true">
              <icon-svg icon-class="leftSidebar" class="i-icon"></icon-svg>
            </span>
          </el-tooltip>
          <el-tooltip effect="dark" content="保存" placement="bottom">
            <span @click="saveHandle">
              <icon-svg icon-class="saveArticle" class="i-icon"></icon-svg>
            </span>
          </el-tooltip>
          <span>
            <icon-svg icon-class="publicArticle" class="i-icon"></icon-svg>
            发布文章
          </span>
        </div>
      </div>
      <div class="content">
        <div class="panel">
          <input-file
            :width="750" :height="218" shape="square"
            :src.sync="img.src" :file.sync="img.file">
            <i class="el-icon-picture-outline"></i>
          </input-file>
          <el-input
            type="textarea" placeholder="请输入标题（最多50个字）" :rows="1"
            v-model="title" :maxlength="50" show-word-limit
            :autosize="true" resize="none" @keydown.native="noLineHandle">
          </el-input>
          <article-design :data.sync="editorData"></article-design>
        </div>
      </div>
    </div>
    <dialog-new-folder
      :visible.sync="dlNewFolder.visible" @confirm="confirmHandle" :title="dlNewFolder.title"
      :res="dlNewFolder.res" />
  </div>
</template>

<script>
/**
 * 文章编辑器
 */

import { Vue, Component, Watch, Ref } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import * as API from '@/api'
import { transformList } from '@/until/docTransform'
import SidebarFolderList from '@/components/SidebarList/SidebarFolderList'
import SidebarDocList from '@/components/SidebarList/SidebarDocList'
import InputFile from '@/components/InputFile'
import ArticleDesign from '@/components/Editor/ArticleDesign'
import DialogNewFolder from '@/components/Dialog/DialogNewFolder'
import '@/icons/svg/publicArticle.svg'
import '@/icons/svg/saveArticle.svg'
import '@/icons/svg/leftSidebar.svg'

@Component({
  components: {
    InputFile,
    ArticleDesign,
    SidebarFolderList,
    SidebarDocList,
    DialogNewFolder
  }
})
class ArticleEditor extends Vue {
  // 图片
  img = {
    file: null, // 文件
    src: '' // 地址
  }
  // 标题
  title = ''
  // 侧边栏显示隐藏
  drawerShow = true
  // 请求的分类列表数据
  folderRes = { rows: [] }
  // 请求的文章列表数据
  fileRes = { rows: [] }
  // 弹窗信息
  dlNewFolder = {
    visible: false, // 弹窗的显示隐藏
    title: '', // 弹窗标题
    res: { // 数据
      thumbnailURL: '',
      folderName: '',
      folderId: null
    }
  }
  // 当前被选中的文件夹项
  actFolderIndex = 0
  // 当前被选中的文章项
  actFileIndex = 0
  // 编辑器内容数据
  editorData = ''

  @Getter
  getUserInfo

  mounted () {
    const userId = this.$route.params.userId

    this.apiGetFolderList(userId).finally(() => {
      this.actFolderIndex = 0
      this.folderSelHandle(this.folderRes.rows[this.actFolderIndex])
    })
  }

  @Watch('title')
  onTitleChanged (nV, oV) {
    this.title = nV.replace(/[\r\n]/g, '')
  }

  // 标题禁止换行
  noLineHandle (event) {
    if (event.keyCode === 13) {
      event.returnVlaue = false

      event.preventDefault()
    }
  }

  // 分类文件夹被选中项
  folderSelHandle (item) {
    this.actFileIndex = 0
    this.apiGetFileList(item.folderId).finally(() => {
      let item = this.fileRes.rows[this.actFileIndex]

      if (item && item.fileUUID) {
        this.apiGetAllArticle(item.fileUUID)
      }
    })
  }

  // 新建分类文件夹
  folderCreHandle () {
    this.dlNewFolder.title = '新建分类文件夹'
    this.dlNewFolder.res = {
      thumbnailURL: '',
      folderName: '',
      folderId: null
    }
    this.dlNewFolder.visible = true
  }

  // 确认新建文件夹
  confirmHandle (formData) {
    this.apiCreateFolder(formData)
  }

  // 文件夹右键菜单执行命令
  cmdFolderHandle (cmd) {
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

  // 修改
  cmdModify () {
    let item = this.folderRes.rows[this.actFolderIndex]

    this.dlNewFolder.title = '修改分类文件夹'
    this.dlNewFolder.res = {
      thumbnailURL: item.thumbnailURL,
      folderName: item.folderName,
      folderId: item.folderId
    }
    this.dlNewFolder.visible = true
  }

  // 删除
  cmdDelete () {
    this.$confirm('将删除文件夹里所有的文件，是否继续？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.apiDeleteFolder(this.folderRes.rows[this.actFolderIndex].folderId)
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }

  // 新建文章
  fileCreHandle () {
    let item = this.folderRes.rows[this.actFolderIndex]
    this.apiCreateArticle(item.folderId)
  }

  // 文章被选中项
  fileSelHandle (item) {
    this.drawerShow = false

    this.apiGetAllArticle(item.fileUUID)
  }

  // 保存文章
  saveHandle () {
    let form = new FormData()
    if (this.img.file) {
      form.append('file', this.img.file)
    }
    let item = this.fileRes.rows[this.actFileIndex]
    form.append('fileUUID', item.fileUUID)
    form.append('title', this.title)
    form.append('content', this.editorData)
  }

  // 接口获取分类列表
  apiGetFolderList (userUUID) {
    return API.folder.getFolderList(userUUID).then(res => {
      if (res.code !== 0) return

      const data = this.folderRes = res.data
    })
  }

  // 接口获取文件列表
  apiGetFileList (folderId = null) {
    return API.file.getAllFileList(folderId).then(res => {
      if (res.code !== 0) return

      let store = []

      let data = transformList(res.data)
      data.forEach(year => {
        year.list.forEach(item => {
          store.push(item)
        })
      })

      this.fileRes.rows = store
    })
  }

  // 接口，创建/修改 分类文件夹
  apiCreateFolder (formData) {
    API.folder.createFolder(formData, progress => {
      console.log(progress)
    }).then(res => {
      this.dlNewFolder.visible = false
      let folderId = formData && formData.get('folderId')

      if (folderId === null) {
        // 新建
        this.actFolderIndex = 0
      }

      this.$message.success(res.msg)

      this.apiGetFolderList(this.getUserInfo.userUUID)
    })
  }

  // 接口，删除分类文件夹
  apiDeleteFolder (folderId) {
    API.folder.deleteFolder(folderId).then(res => {
      this.actFolderIndex = 0

      this.$message({
        type: 'success',
        message: '删除成功!'
      })

      this.apiGetFolderList(this.getUserInfo.userUUID)
    })
  }

  // 接口，新建文章
  apiCreateArticle (folderId) {
    return API.file.createAritcle(folderId).then(res => {
      this.$message.success('新建文章成功')

      this.apiGetFileList(folderId)
    })
  }

  // 接口，获取文章内容
  apiGetAllArticle (fileUUID) {
    API.file.getAllArticle(fileUUID).then(res => {
      this.editorData = res.data.content || ''
      this.title = res.data.title || ''
      this.img.src = res.data.thumbnailURL || ''
      this.img.file = null
    })
  }
}

export default ArticleEditor
</script>

<style lang="less" scoped>
.articleEditor {
  background-color: #F9F9F9;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  &>.articlePanel {
    width: inherit;
    height: inherit;
    min-width: 700px;
    position: relative;
    padding-top: 40px;
  }
}
.el-drawer__wrapper {
  & /deep/ .el-drawer__header {
    padding: 0px;
    margin: 0px;
    width: 0px;
    height: 0px;

    &>button {
      position: relative;
      top: 20px;
      left: 170px;
      color: white;
    }
  }
}
.drawerContent {
  height: 100%;
}
.sidebarFolderList {
  width: 200px;
  height: 100%;
  float: left;
}
.sidebarDocList {
  width: 300px;
  height: 100%;
  float: left;
}
.topNavbar {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 9;
  border-bottom: 1px solid #C4C4C4;
  display: flex;
  flex-direction: row;
  background-color: #FAFAFA;

  &>.ckToolbar {
    flex-grow: 1;
    flex-shrink: 1;
    max-width: calc(100% - 157px);
  }
  &>.rightGroup {
    flex-grow: 0;
    flex-shrink: 0;
    box-sizing: border-box;
    font-size: 14px;

    &>span {
      float: left;
      margin: 3.9px 3.9px 3.9px 0px;
      padding: 2.34px 7px;
      height: 27.9px;
      line-height: 23.22px;
      cursor: default;
      outline: none;

      &:hover {
        background-color: #E6E6E6;
      }
    }
  }
}
.content {
  width: 100%;
  height: 100%;
  // margin-top: 40px;
  overflow-x: hidden;
  overflow-y: auto;

  &>.panel {
    width: 750px;
    margin: 20px auto 40px;
  }
}
.inputFile {
  float: left;
  background-color: #DBDEE5;

  /deep/ i {
    font-size: 80px;
    line-height: 197px;
    color: white;
  }
}
.el-textarea {
  margin: 16px 0px;

  /deep/ textarea {
    font-size: 32px;
    font-weight: 600;
    outline: none;
    border: 0px;
    padding-bottom: 21px;
    color: #1a1a1a;
    font-weight: 600;
  }
}
</style>
