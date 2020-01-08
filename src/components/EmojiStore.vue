<template>
  <div class="emojiStore">
    <el-carousel
      trigger="click" :autoplay="false" height="208px"
      arrow="never" @mousewheel.native.stop="throttledScrollHandle()" ref="refCarousel"
    >
      <el-carousel-item>1</el-carousel-item>
      <el-carousel-item>2</el-carousel-item>
      <el-carousel-item>3</el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
/**
 * 评论用的表情库
 */
import * as td from 'throttle-debounce'

export default {
  name: 'EmojiStore',
  methods: {
    throttledScrollHandle () {
      return td.throttle(300, this.scrollHandle)
    },
    scrollHandle (e) {
      // left向左滚动，right向右滚动
      console.log(123)
      let dir = e.deltaY < 0 ? 'right' : 'left'

      if (dir === 'left') {
        this.$refs.refCarousel.next()
      } else {
        this.$refs.refCarousel.prev()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.emojiStore {
  width: 350px;
  height: 210px;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 4px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
