<template>
  <div class="contextMenu" :style="{ width }">
    <ul class="menu-main">
      <li
        class="menu-item__one" v-for="(one, i) in data" :key="i"
        :style="{ color: one.color }"
      >
        <span class="leftIcon icon" v-html="one.icon"></span>
        <span class="label">{{ one.label }}</span>
      </li>
      <hr>
      <li class="menu-item__one">
        <span class="label">打开文件位置</span>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * 右键菜单
 */

import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
class ContextMenu extends Vue {
  @Prop({ type: String, default: '160px' })
  width

  @Prop({ type: [], default: [] })
  data
}

export default ContextMenu
</script>

<style lang="less" scoped>
ul, li {
  list-style: none;
}
.contextMenu {
  background-color: white;
}
.menu-main {
  border: 1px solid #d3d3d3;
  box-shadow: 0 2px 12px 0 rgba(56,56,56,.2);
  border-radius: 2px;
  padding: 4px;
  padding-top: 0px;
  font-size: 12px;
  color: #626b84;

  &>.menu-item__one {
    width: 100%;
    height: 30px;
    line-height: 30px;
    position: relative;
    margin-top: 4px;
    cursor: pointer;

    &:hover {
      background-color: #f2f5fa;
    }
    &>.icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 16px;

      &.leftIcon {
        left: 10px;
      }
      &.rightIcon {
        right: 10px;
      }
    }
    &>.label {
      height: 100%;
      display: block;
      padding: 0px 36px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  hr {
    border: 0px;
    border-top: 1px solid #f3f6f9;
    margin-top: 4px;
  }
}
</style>
