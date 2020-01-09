<template>
  <div class="emojiStore">
    <el-carousel
      trigger="click" :autoplay="false" height="208px"
      arrow="never" @mousewheel.native.stop="throttledScrollHandle" ref="refCarousel"
    >
      <el-carousel-item>1</el-carousel-item>
      <el-carousel-item>2</el-carousel-item>
      <el-carousel-item>3</el-carousel-item>
      <el-carousel-item>4</el-carousel-item>
      <el-carousel-item>5</el-carousel-item>
    </el-carousel>
    <!-- <carousel-panel height="208px">
      <carousel-item>1</carousel-item>
      <carousel-item>2</carousel-item>
      <carousel-item>3</carousel-item>
    </carousel-panel> -->
  </div>
</template>

<script>
/**
 * 评论用的表情库
 */
import { Vue, Component, Ref } from 'vue-property-decorator'
import { throttle, debounce } from 'throttle-debounce'
import CarouselPanel from '@/components/Carousel/Carousel-panel'
import CarouselItem from '@/components/Carousel/Carousel-item'

@Component({
  components: {
    CarouselPanel,
    CarouselItem
  }
})
class EmojiStore extends Vue {
  // 节流控制
  get throttledScrollHandle () {
    return throttle(700, this.scrollHandle)
  }
  
  scrollHandle (e) {
    // left向左滚动，right向右滚动
    e.deltaY < 0 ? this.refCarousel.prev() : this.refCarousel.next()
  }

  @Ref()
  refCarousel
}

export default EmojiStore
</script>

<style lang="less" scoped>
.emojiStore {
  width: 350px;
  height: 210px;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 4px;
}
.carousel-item:nth-child(2n) {
  background-color: #99a9bf;
}
.carousel-item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
