<template>
  <div class="emojiStore">
    <el-carousel
      trigger="click" :autoplay="false" height="208px"
      arrow="never"
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

export default {
  name: 'EmojiStore'
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
