<template>
  <div class="backPage">
    <div class="back-page__left" @click="redirect">
      <i class="el-icon-back"></i>
      <div class="back-page__title">返回</div>
    </div>
    <div class="back-page__content">{{ content }}</div>
  </div>
</template>

<script>
/**
 * 返回按钮
 * @param content 显示所属的分类文件夹
 * @param to 页面跳转
 */

export default {
  name: 'BackPage',
  props: {
    content: {
      type: String,
      default: ''
    },
    to: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    redirect () {
      this.$router.push(this.to)
    }
  }
}
</script>

<style lang="less" scoped>
.backPage {
  height: 50px;
  line-height: 50px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  box-shadow: 0px 0px 7px 1px rgba(0,0,0,0.1);
  border-radius: 7px;

  &>.back-page__left {
    flex-shrink: 0;
    padding-right: 20px;
    padding-left: 10px;
    margin-right: 20px;
    display: flex;
    cursor: pointer;
    position: relative;
    user-select: none;

    &::after {
      content: '';
      position: absolute;
      width: 1px;
      height: 16px;
      top: 50%;
      right: 0px;
      transform: translateY(-50%);
      background-color: #dcdfe6;
    }
    &:hover {
      border-radius: 7px 0px 0px 7px;
      color: #409EFF;

      &+.back-page__content {
        max-width: 1000px;
      }
    }
    &>.el-icon-back {
      font-size: 18px;
      margin-right: 6px;
      align-self: center;
    }
    &>.back-page__title {
      font-size: 14px;
      font-weight: 500;
    }
  }
  &>.back-page__content {
    font-size: 18px;
    color: #303133;
    flex-shrink: 0;
    cursor: default;
    margin-right: 10px;
    max-width: 0px;
    overflow: hidden;
    transition-duration: 1s;
    transition-property: all;
    transition-timing-function: ease;
  }
}
</style>
