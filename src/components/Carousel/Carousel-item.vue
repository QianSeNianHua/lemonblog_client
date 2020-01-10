<template>
  <div class="carousel-item" :class="{ 'is-active': active, 'is-animating': animating }" :style="itemStyle">
    <slot></slot>
  </div>
</template>

<script>
/**
 * 走马灯——li
 */
import { Vue, Component } from 'vue-property-decorator'

@Component
class CarouselItem extends Vue {
  active = false
  animating = false
  translate = 0
  scale = 1

  get itemWidth () {
    return this.$parent.$el.offsetWidth
  }

  get itemLength () {
    return this.$parent.items.length
  }

  get itemStyle () {
    const value = `translateX(${this.translate}px) scale(${this.scale})`

    const style = {
      transform: value
    }

    return style
  }

  calcTranslate (index, activeIndex) {
    return this.itemWidth * (index - activeIndex)
  }

  translateItem (index, activeIndex, oldIndex) {
    this.active = index === activeIndex
    this.animating = index === activeIndex || index === oldIndex

    let posiCount = Math.ceil(this.itemLength / 2)

    let trans = index - activeIndex

    // 关键算法
    if (trans > posiCount - 1) {
      this.translate = this.calcTranslate(index - this.itemLength, activeIndex)
    } else if (trans < posiCount - this.itemLength) {
      this.translate = this.calcTranslate(index + this.itemLength, activeIndex)
    } else {
      this.translate = this.calcTranslate(index, activeIndex)
    }
  }
}

export default CarouselItem
</script>

<style lang="less" scoped>
.carousel-item {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  z-index: 0;
}
.carousel-item, .carousel-mask {
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
}
.carousel-item.is-animating {
  -webkit-transition: transform .4s ease-in-out, -webkit-transform .4s ease-in-out;
  transition: transform .4s ease-in-out, -webkit-transform .4s ease-in-out;
}
.carousel-item.is-active {
  z-index: 2;
}
</style>
