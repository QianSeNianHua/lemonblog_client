<template>
  <div class="backTop">
    <div
      v-show="isShow" @click.stop="toTop" :style="{ right: styleRight, bottom: styleBottom }"
      class="btn"
    >
      <slot>
        <el-icon></el-icon>
      </slot>
    </div>
  </div>
</template>

<script>
/**
 * 滚动到顶部
 * 配合vuescroll一起使用，不支持原生滚动条
 */
import * as td from 'throttle-debounce'

const cubic = value => Math.pow(value, 3)
const easeInOutCubic = value => value < 0.5
  ? cubic(value * 2) / 2
  : 1 - cubic((1 - value) * 2) / 2

export default {
  name: 'BackTop',
  props: {
    // 触发滚动的对象。通过$refs获取vue-scroll的对象，传递给target
    target: Object,
    // 滚动高度达到此参数值才出现
    visibilityHeight: {
      type: Number,
      default: 200
    },
    // 控制其显示位置, 距离页面右边距
    right: {
      type: Number,
      default: 40
    },
    // 控制其显示位置, 距离页面底部距离
    bottom: {
      type: Number,
      default: 40
    }
  },
  data () {
    return {
      // 显示按钮
      isShow: false
    }
  },
  computed: {
    getTarget () {
      return this.target
    },
    styleBottom () {
      return `${this.bottom}px`
    },
    styleRight () {
      return `${this.right}px`
    }
  },
  watch: {
    getTarget (newV, oldV) {
      this.init(newV)

      // 如果存在，则不需要重复加载
      if (oldV) return

      // 节流
      this.throttledHandlerScroll = td.throttle(300, this.handleScroll)

      newV.$on('handle-scroll', this.throttledHandlerScroll)
    }
  },
  created () {
    this.throttledHandlerScroll = null
  },
  destroyed () {
    this.getTarget.$off('handle-scroll', this.throttledHandlerScroll)
  },
  methods: {
    init (target) {
      if (!this.target) {
        throw new Error(`target is not existed: ${this.target}`)
      }
    },
    // 滚动时显示按钮
    handleScroll (vertical) {
      if (vertical.scrollTop >= this.visibilityHeight) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    // 滚动到顶部
    toTop () {
      const el = this.getTarget
      const beginTime = Date.now()
      const beginValue = el.scrollTop
      const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500

        console.log(beginValue)

        if (progress < 1) {
          el.scrollTop = beginValue * (1 - easeInOutCubic(progress))
          rAF(frameFunc)
        } else {
          el.scrollTo({ y: 0 }, 300, 'easeInQuad')
        }
      }

      rAF(frameFunc)
    }
  }
}
</script>

<style lang="less" scoped>
.backTop {
  position: fixed;
  bottom: 40px;
  right: 40px;
}
.btn {
  transition: all 1s ease;
}
</style>
