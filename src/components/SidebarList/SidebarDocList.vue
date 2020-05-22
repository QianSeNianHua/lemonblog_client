<template>
  <div class="sidebarDocList">
    <div class="createDoc" @click="createHandle">
      <i class="el-icon-circle-plus"></i>
      <span>新建文章</span>
    </div>
    <ul class="list">
      <li
        v-for="(item, index) in res" :key="index"
        :class="[ activeIndexSync === index ? 'selected' : '' ]">
        <span @click="wirteHandle(index, item)">{{ item.title }}</span>
        <div class="menuBtn">
          <icon-svg icon-class="menu" class="i-icon"></icon-svg>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * 侧边栏，文章列表
 * @prop {array} res 数据
 * @emit item 被选中项
 */
import { Vue, Component, Prop, Emit, PropSync } from 'vue-property-decorator'
import { transformList } from '@/until/docTransform'

@Component
class SidebarDocList extends Vue {
  // 数据
  @Prop({ type: Array, default: () => ([]) })
  res

  // 当前被选中项
  @PropSync('activeIndex', { type: Number, default: 0 })
  activeIndexSync

  // 新建文章
  @Emit('create')
  createHandle () {
  }

  // 被选中项
  wirteHandle (index, item) {
    if (this.activeIndexSync !== index) {
      this.activeIndexSync = index

      this.$emit('selected', item)
    }
  }
}

export default SidebarDocList
</script>

<style lang="less" scoped>
.createDoc {
  padding: 20px 0px 20px 25px;
  font-size: 14px;
  line-height: 21px;
  cursor: pointer;
  border-bottom: 1px solid #D9D9D9;

  &:hover {
    font-weight: 600;
  }
  &>i {
    margin-right: 4px;
    font-size: 18px;
    vertical-align: text-bottom;
  }
  &>span {
    font-size: 15px;
  }
}
ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list {
  &>li {
    width: 100%;
    height: 90px;
    padding: 15px 10px 15px 12px;
    cursor: pointer;
    color: #333;

    &:hover {
      background-color: #E6E6E6;
    }
    &.selected {
      border-left: 5px solid #409EFF;
      background-color: #E6E6E6;
    }
    &>span {
      @height: 60px;

      display: block;
      height: @height;
      line-height: @height;
      margin-right: 40px;
    }
    &>.menuBtn {
      @height: 60px;

      width: 40px;
      height: @height;
      float: right;
      text-align: center;
      line-height: @height;
      font-size: 22px;
      color: #333;
      position: relative;
      top: -@height;
      right: 0px;
    }
  }
}
</style>
