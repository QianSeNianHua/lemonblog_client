<template>
  <div class="card articleCard" @click="redirect">
    <img src="http://img.sj33.cn/uploads/201908/010424E10-7.jpg" class="card_image">
    <div class="card_body">
      <h3>javscriptjavascript       javscs javascri</h3>
      <div>
        <p>内容第三方时代浮点数防守打法都是分都是</p><p>内的发范德萨范德萨发速度发送到发送的浮点数容</p><p>内容第三方时代浮点数防守打法都是分都是</p><p>内的发范德萨范德萨发速度发送到发送的浮点数容</p>
      </div>
    </div>
    <div class="card_foot">
      <el-tag type="success" title="文件夹">文件夹</el-tag>
      <el-tag type="gray" class="view" title="访问量">
        <span class="view"></span>0
      </el-tag>
      <el-tag type="gray" class="view" title="评论量">
        <span class="comment"></span>0
      </el-tag>
    </div>
  </div>
</template>

<script>
/**
 * 文章卡片
 */

export default {
  name: 'ArticleCard',
  props: {
    // 图片
    img: {
      type: String,
      default: ''
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 正文
    content: {
      type: String,
      default: ''
    },
    // 文件夹
    folder: {
      type: String,
      default: ''
    },
    // 访问量
    view: {
      type: Number,
      default: 0
    },
    // 评论量
    comment: {
      type: Number,
      default: 0
    },
    // 页面跳转
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
.card {
  width: 300px;
  border-radius: 15px;
  display: inline-block;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  border: 1px solid #EBEEF5;
  background-color: #FFF;
  color: #303133;
  transition: .3s;
  overflow: hidden;
}
.card_image {
  display: block;
  width: 100%;
  height: 200px;
  margin: 0px auto;
}
.card_body {
  width: 100%;
  height: 180px;
  padding: 20px;
  border-bottom: 1px solid #d1dbe5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &>h3 {
    white-space: pre-wrap;
    word-break: break-all;
    font-size: 20px;
    flex-shrink: 0;
  }
  &>div {
    margin-top: 10px;
    flex-grow: 1;
    overflow: hidden;
    color: #7f7f7f;
  }
}
.card_foot {
  width: 100%;
  height: 45px;
  padding: 10px 20px;
}
.el-tag {
  cursor: default;
  height: 25px;
  line-height: 23px;
  margin-right: 15px;
  max-width: 100px;

  &.view {
    background-color: #e4e8f1;
    border-color: #e4e8f1;
    color: #48576a;
  }
  &>span {
    width: 20px;
    height: 20px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    float: left;
    margin-right: 7px;
    margin-top: 2px;

    &.view {
      background-image: url('~@/assets/images/view.png');
    }
    &.comment {
      background-image: url('~@/assets/images/comment.png');
    }
  }
}
</style>
