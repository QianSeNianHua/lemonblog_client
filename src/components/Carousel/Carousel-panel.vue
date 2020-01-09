<template>
  <div class="carousel-panel carousel-panel--horizontal">
    <div class="carousel__container" :style="{ height }">
      <slot></slot>
    </div>
    <ul class="carousel__indicators carousel__indicators--horizontal">
      <li :class="['carousel__indicator', 'carousel__indicator--horizontal', { 'is-active': index === activeIndex }]" v-for="(item, index) in items" :key="index">
        <button class="carousel__button"></button>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * 走马灯——ul
 */
import { Component, Prop, Watch } from 'vue-property-decorator'
import Main from './main.js'

@Component
class CarouselPanel extends Main {
  // 子组件
  items = []
  activeIndex = -1

  @Prop({ type: String })
  height

  @Prop({ type: Number, default: 0 })
  initialIndex

  @Watch('activeIndex')
  onActiveIndexChanged (val, oldVal) {
    console.log(val)
    this.resetItemPosition(oldVal)
  }

  mounted () {
    this.updateItems()
    this.setActiveIndex(this.initialIndex)
    this.$nextTick(() => {
    })
  }
}

export default CarouselPanel
</script>

<style>
.carousel-panel {
  position: relative;
}
.carousel-panel--horizontal {
  overflow-x: hidden;
}
.carousel__container {
  position: relative;
  height: 300px;
}
.carousel__indicators {
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 2;
}
.carousel__indicators--horizontal {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
}
.carousel__indicator {
  background-color: transparent;
  cursor: pointer;
}
.carousel__indicator--horizontal {
  display: inline-block;
  padding: 12px 4px;
}
.carousel__indicator.is-active button {
  opacity: 1;
}
.carousel__button {
  display: block;
  opacity: 0.48;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: white;
  border: 0;
  outline: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  -webkit-transition: .3s;
  transition: .3s;
}
</style>
