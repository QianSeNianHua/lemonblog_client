<template>
  <div class="sidebarFolderList">
    <div class="backHome">
      <el-button round>回到首页</el-button>
    </div>
    <div class="createFolder" @click="createHandler">
      <i class="el-icon-circle-plus"></i>
      <span>新建分类文件夹</span>
    </div>
    <ul class="list">
      <li
        v-for="(item, index) in res" :key="index"
        :class="[ activeIndexSync === index ? 'selected' : '' ]">
        <span @click="itemHandle(index, item)">{{ item.folderName }}</span>
        <div class="menuBtn" @click.prevent="menuHandle($event)" v-show="activeIndexSync === index">
          <icon-svg icon-class="menu" class="i-icon"></icon-svg>
        </div>
        <el-image :src="item.thumbnailURL">
          <div slot="error">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </li>
    </ul>
    <focus-panel
      ref="refFocusPanel" trans="top" trigger="bilateral"
      :x="contextPosi.x" :y="contextPosi.y">
      <context-menu :data="contextData" width="130px" @command="dropdownCmd"></context-menu>
    </focus-panel>
  </div>
</template>

<script>
/**
 * 侧边栏，分类文件夹列表
 * @prop {array} res 数据
 * @propSync {number} activeIndex 当前选中项
 * @emit selected 被选中项
 * @emit create 新建分类文件夹
 * @emit command 右键菜单执行命令
 */
import { Vue, Component, Prop, Emit, Ref, PropSync } from 'vue-property-decorator'
import '@/icons/svg/menu.svg'
import '@/icons/svg/modify.svg'
import FocusPanel from '@/components/FocusPanel/FocusPanel'
import ContextMenu from '@/components/FocusPanel/ContextMenu'

@Component({
  components: {
    FocusPanel,
    ContextMenu
  }
})
class SidebarFolderList extends Vue {
  // 数据
  @Prop({ type: Array, default: () => ([]) })
  res

  // 当前选中项
  @PropSync('activeIndex', { type: Number, default: 0 })
  activeIndexSync

  // 右键菜单的位置
  contextPosi = {
    x: 100,
    y: 326
  }
  // 右键菜单数据
  contextData = [
    { label: '修改', svg: 'modify', cmd: 'modify', disable: false },
    { label: '删除', icon: 'el-icon-delete', color: 'red', cmd: 'delete', disable: false }
  ]

  @Ref()
  refFocusPanel

  // 被选中项
  itemHandle (index, item) {
    if (this.activeIndexSync !== index) {
      this.activeIndexSync = index

      this.$emit('selected', item)
    }
  }

  // 新建分类文件夹
  @Emit('create')
  createHandler () {
  }

  // 右键菜单执行命令
  @Emit('command')
  dropdownCmd (cmd) {
    this.refFocusPanel.blur()

    return cmd
  }

  // folderList的菜单事件
  menuHandle (event) {
    // this.contextPosi.x = event.clientX || event.pageX || event.x
    this.contextPosi.y = event.clientY || event.pageY || event.y

    this.refFocusPanel.focus()
  }
}

export default SidebarFolderList
</script>

<style lang="less" scoped>
.sidebarFolderList {
  min-width: 210px;
  height: 100%;
  background-color: #404040;
}
.backHome {
  padding: 50px 18px 5px;
  width: 100%;

  &>.el-button {
    margin: 0px auto;
    background-color: initial;
    border-color: #67B2FF;
    color: #67B2FF;
    width: 100%;

    &:hover {
      border-color: #409EFF;
      color: #409EFF;
    }
  }
}
.createFolder {
  width: 100%;
  height: 21px;
  margin: 20px 0px 10px;
  padding: 0px 15px;
  font-size: 14px;
  line-height: 21px;
  cursor: pointer;
  color: #E7E7E7;

  &:hover {
    font-weight: 600;
  }
  &>i {
    margin-right: 4px;
    font-size: 18px;
    vertical-align: text-bottom;
  }
}
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.list {
  &>li {
    width: 100%;
    height: 40px;
    padding-left: 12px;
    cursor: pointer;
    color: #E7E7E7;

    &:hover {
      background-color: #666666;
    }
    &.selected {
      border-left: 3px solid #409EFF;
      background-color: #666666;
    }
    &>span {
      display: block;
      height: 40px;
      line-height: 40px;
      margin: 0px 40px;
    }
    &>.el-image {
      position: relative;
      top: -40px;
      right: 0px;
      background-color: #F5F7FA;
      width: 30px;
      height: 30px;
      margin: 5px;
      color: #909399;
      text-align: center;
      line-height: 30px;
      font-size: 12px;
    }
    &>.menuBtn {
      width: 40px;
      height: 40px;
      float: right;
      text-align: center;
      line-height: 40px;
      font-size: 22px;
      color: #E7E7E7;
      position: relative;
      top: -40px;
      right: 0px;
    }
  }
}
.contextMenu /deep/ li.menu-item__one:nth-child(1) {
  & .leftIcon {
    left: 6px;
    font-size: 22px;
  }
}
</style>
