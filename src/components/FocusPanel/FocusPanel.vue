<template>
  <div
    :class="[ 'focusPanel', { show: visible }, classTransform ]" tabindex="0" hidefocus="true"
    v-show="wholeVisible" ref="refFocusPanel" :style="styleOrigin"
    @focus="afterFocus" @blur="afterBlur" @contextmenu.prevent="() => {}"
  >
    <slot></slot>
  </div>
</template>

<script>
/**
 * 设置一个具有“聚焦”“失焦”的div容器，用于右键菜单，点击弹出菜单等
 * @param props
 * @param visible (被父组件调用)显示隐藏
 * @event focus (被父组件调用)聚焦
 * @event blur (被父组件调用)失焦
 * @event @afterFocus 聚焦后的回调事件
 * @event @afterBlur 失焦后的回调函数
 */
import { Vue, Component, Emit, Prop } from 'vue-property-decorator'

let timeId = 0

@Component
class FocusPanel extends Vue {
  // 显示隐藏
  animateVisible = false // 动画的显示隐藏
  wholeVisible = false // v-show

  // 展开动画的轴心，'': 表示不设置轴心; '$1': $1 (top, bottom, left, right)表示轴心
  @Prop({ type: String, default: '' })
  trans

  // 聚焦后
  @Emit('afterFocus')
  afterFocus () {
    this.animateVisible = true
  }

  // 失焦后
  @Emit('afterBlur')
  afterBlur () {
    clearTimeout(timeId)
    this.animateVisible = false

    timeId = setTimeout(() => {
      this.wholeVisible = false
    }, 320)
  }

  // 获取样式transform-origin
  get styleOrigin () {
    if (!this.trans) return {}

    return { 'transform-origin': this.trans }
  }

  // 获取样式transform
  get classTransform () {
    if (!this.trans) return ''

    if (this.trans === 'top' || this.trans === 'bottom') {
      if (this.animateVisible) {
        return 'showY'
      } else {
        return 'hideY'
      }
    } else if (this.trans === 'left' || this.trans === 'right') {
      if (this.animateVisible) {
        return 'showX'
      } else {
        return 'hideX'
      }
    }
  }

  // 被父组件调用
  get visible () {
    return this.wholeVisible
  }

  // 手动聚焦
  focus () {
    if (this.wholeVisible) return

    this.wholeVisible = true

    this.$nextTick(() => {
      this.$refs.refFocusPanel.focus()
    })
  }

  // 手动失焦
  blur () {
    this.$refs.refFocusPanel.blur()
  }
}

export default FocusPanel
</script>

<style lang="less" scoped>
.focusPanel {
  outline: none;
  cursor: default;
  user-select: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  transition: all 0.3s ease;

  &.showY {
    transform: scaleY(1)
  }
  &.hideY {
    transform: scaleY(0)
  }
  &.showX {
    transform: scaleY(1)
  }
  &.hideX {
    transform: scaleY(0)
  }
}
</style>
