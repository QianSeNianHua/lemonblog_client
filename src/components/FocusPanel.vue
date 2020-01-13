<template>
  <div
    class="focusPanel" tabindex="0" hidefocus="true"
    @focus="focusHandle" @blur="blurHandle" v-show="visible"
    ref="refFocusPanel" @contextmenu.prevent="() => {}"
  >
    <slot></slot>
  </div>
</template>

<script>
/**
 * 设置一个具有“聚焦”“失焦”的div容器，用于右键菜单，点击弹出菜单等
 * @event focus (被父组件调用)聚焦
 * @event blur (被父组件调用)失焦
 * @event afterFocus 聚焦后的回调事件
 * @event afterBlur 失焦后的回调函数
 */

export default {
  name: 'FocusPanel',
  data () {
    return {
      visible: false
    }
  },
  methods: {
    // 聚焦后
    focusHandle () {
      this.$emit('afterFocus')
    },
    // 失焦后
    blurHandle () {
      // this.visible = false
      
      this.$emit('afterBlur')
    },
    // 手动聚焦
    focus () {
      if (this.visible) return

      this.visible = true

      this.$nextTick(() => {
        this.$refs.refFocusPanel.focus()
      })
    },
    // 手动失焦
    blur () {
      this.$nextTick(() => {
        this.$refs.refFocusPanel.blur()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.focusPanel {
  outline: none;
  cursor: default;
  user-select: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
}
</style>
