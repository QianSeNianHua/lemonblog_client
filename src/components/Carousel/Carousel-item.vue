<template>
  <div
    class="carousel-item is-animating" :class="{ 'is-active': active }" :style="itemStyle"
  >
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
  translate = 0
  scale = 0

  get itemWidth () {
    return this.$parent.$el.offsetWidth
  }

  get itemLength () {
    return this.$parent.items.length
  }

  get itemStyle () {
    return `transform: translateX(${this.translate})px, scale(1);`
  }

  calcTranslate (index, activeIndex) {
    return this.itemWidth * (index - activeIndex)
  }

  translateItem (index, activeIndex, oldIndex) {
    // let posiCount = Math.floor(this.itemLength / 2)

    // if (activeIndex <= index && )

    // const last = (activeIndex - 1) < 0 ? this.itemLength - 1 : activeIndex - 1

    // if (index !== last) {

    // }
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
