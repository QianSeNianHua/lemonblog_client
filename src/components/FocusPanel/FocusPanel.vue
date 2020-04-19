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
 * @prop   trigger 触发类型
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
  animateVisible = false // 动画的显示隐藏
  wholeVisible = false // v-show
  positX = 0
  positY = 0

  // 展开动画的轴心，'': 表示不设置轴心; '$1': $1  [top, bottom, left, right]表示轴心
  @Prop({ type: String, default: '' })
  trans

  // 容器x定位，单位：xp
  @Prop({ type: Number, default: 0 })
  x

  // 容器y定位，单位：xp
  @Prop({ type: Number, default: 0 })
  y

  // 触发类型，unilateral 表示单边的，点击同一地方只能显示隐藏，bilateral 表示双边的，点击同一地方一直是显示，点其他地方才能隐藏
  @Prop({ type: String, default: 'unilateral' })
  trigger

  // 聚焦后
  @Emit('afterFocus')
  afterFocus () {
    this.animateVisible = true
    this.formatX()
    this.formatY()
  }

  // 失焦后
  @Emit('afterBlur')
  afterBlur () {
    clearTimeout(timeId)
    this.animateVisible = false

    if (this.trigger === 'unilateral') {
      // 单边
      timeId = setTimeout(() => {
        this.wholeVisible = false
      }, 320)
    } else if (this.trigger === 'bilateral') {
      // 双边
      this.wholeVisible = false
    }
  }

  // 获取样式transform-origin
  get styleOrigin () {
    if (!this.trans) return {}

    return { 'transform-origin': this.trans, 'left': this.positX, 'top': this.positY }
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

  // 获取转换后的x轴
  formatX () {
    this.$nextTick(() => {
      try {
        let elWidth = this.$el.scrollWidth || this.$el.offsetWidth || this.$el.clientWidth
        let sumWidth = window.innerWidth || document.body.clientWidth
        let offsetX = this.x + elWidth

        if (offsetX < sumWidth) {
          this.positX = this.x + 'px'
        } else {
          this.positX = this.x - elWidth + 'px'
        }
      } catch (error) {
        this.positX = '0px'
      }
    })
  }

  // 获取转换后的y轴
  formatY () {
    this.$nextTick(() => {
      try {
        let elHeight = this.$el.scrollHeight || this.$el.offsetHeight || this.$el.clientHeight
        let sumHeight = window.innerHeight || document.body.clientHeight
        let offsetY = this.y + elHeight

        if (offsetY < sumHeight) {
          this.positY = this.y + 'px'
        } else {
          this.positY = this.y - elHeight + 'px'
        }
      } catch (error) {
        this.positY = '0px'
      }
    })
  }

  // 手动聚焦
  focus () {
    if (this.trigger === 'unilateral') {
      if (this.wholeVisible) return
    }

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
  display: inline-block;
  outline: none;
  cursor: default;
  user-select: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-property: transform;
  position: fixed;
  z-index: 101;

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
