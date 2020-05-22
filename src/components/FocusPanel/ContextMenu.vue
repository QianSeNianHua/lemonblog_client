<template>
  <div class="contextMenu" :style="{ width }">
    <ul class="menu-main">
      <template v-for="(one, i) in data">
        <template v-if="one">
          <li
            class="menu-item__one" :key="i" :style="{ color: one.color }"
            v-if="!one.hr" @click="command(one.cmd, one.disable)" :data-disable="typeof one.disable === 'boolean' ? one.disable : false">
            <span class="leftIcon icon">
              <template v-if="one.icon">
                <i :class="one.icon"></i>
              </template>
              <template v-else-if="one.svg">
                <icon-svg :icon-class="one.svg"></icon-svg>
              </template>
            </span>
            <span class="label">{{ one.label }}</span>
          </li>
          <hr :key="i" v-else>
        </template>
      </template>
    </ul>
  </div>
</template>

<script>
/**
 * 右键菜单
 * @prop {string} width 容器宽度
 * @prop data 右键菜单数据
 * @prop {string} icon el-icon图标名称
 * @prop {string} svg svg图标名称
 * @emit command 菜单的执行命令
 */
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
class ContextMenu extends Vue {
  // 容器宽度
  @Prop({ type: String, default: '160px' })
  width

  /**
   * 右键菜单
   * [
   *   { label: '登录', icon: 'el-icon-delete', svg: 'QQ', color: 'red', cmd: 'login', disable: true },
   *   { hr: true }
   * ]
   */
  @Prop({ type: Array, default: [] })
  data

  command (cmd, disable) {
    if (!disable) {
      this.$emit('command', cmd)
    }
  }
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

    &:not([data-disable="true"]) {
      cursor: pointer;
    }
    &[data-disable="true"] {
      cursor: not-allowed;
    }
    &:hover:not([data-disable="true"]) {
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
    &[data-disable="true"] {
      color: #aaa !important;
    }
  }
  hr {
    border: 0px;
    border-top: 1px solid #f3f6f9;
    margin-top: 4px;
  }
}
</style>
