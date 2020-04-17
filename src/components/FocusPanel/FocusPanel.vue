<template>
  <div
    :class="[ 'focusPanel', { show: wholeVisible }, classTransform ]" tabindex="0" hidefocus="true"
    v-show="wholeVisible" ref="refFocusPanel" :style="styleOrigin"
    @focus="afterFocus" @blur="afterBlur" @contextmenu.prevent="() => {}">
    <slot></slot>
  </div>
</template>

<script>
/**
 * 设置一个具有“聚焦”“失焦”的div容器，用于右键菜单，点击弹出菜单等
 * @prop   trans 展开动画的轴心
 * @prop   x 容器x方向定位
 * @prop   y 容器y方向定位
 * @data   visible (被父组件调用)显示隐藏
 * @method focus 聚焦
 * @method blur 失焦
 * @emit   afterFocus 聚焦后的回调事件
 * @emit   afterBlur 失焦后的回调函数
 */
import { Vue, Component, Emit, Prop, PropSync } from 'vue-property-decorator'

let timeId = 0

@Component
class FocusPanel extends Vue {
  // 显示隐藏
  animateVisible = false // 动画的显示隐藏
  wholeVisible = false // v-show

  // 展开动画的轴心，'': 表示不设置轴心; '$1': $1  [top, bottom, left, right]表示轴心
  @Prop({ type: String, default: '' })
  trans

  // 容器x定位，单位：xp
  @Prop({ type: Number, default: 0 })
  x

  // 容器y定位，单位：xp
  @Prop({ type: Number, default: 0 })
  y

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
    // this.wholeVisible = false

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
    // if (this.wholeVisible) return

    this.wholeVisible = true

    this.$nextTick(() => {
      this.$el.focus()
    })
  }

  // 手动失焦
  blur () {
    this.$el.blur()
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
