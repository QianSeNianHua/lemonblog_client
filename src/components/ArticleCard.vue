<template>
  <div class="card articleCard">
    <el-image src="https://user-gold-cdn.xitu.io/2019/11/8/16e4a65bafa2c3e5?imageView2/1/w/104/h/144/q/95/format/webp/interlace/1" fit="cover" @click.native="redirect">
      <div slot="error" class="image__error">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <div class="card_body">
      <h3>{{ res.title }}</h3>
      <!-- <div>
        <p>内容第三方时代浮点数防守打法都是分都是</p><p>内的发范德萨范德萨发速度发送到发送的浮点数容</p><p>内容第三方时代浮点数防守打法都是分都是</p><p>内的发范德萨范德萨发速度发送到发送的浮点数容</p>
      </div> -->
    </div>
    <div class="card_foot">
      <el-tag type="success" title="文件夹">{{ res.folderName }}</el-tag>
      <el-tag type="gray" class="view" title="访问量">
        <span class="view"></span>{{ res.visit || 0 }}
      </el-tag>
      <el-tag type="gray" class="view" title="评论量">
        <span class="comment"></span>{{ res.countComment }}
      </el-tag>
    </div>
  </div>
</template>

<script>
/**
 * 文章卡片
 */
import { Vue, Component, Prop } from 'vue-property-decorator'

let winopen = null

@Component()
class ArticleCard extends Vue {
  // 页面跳转
  @Prop({ type: Object, default: {} })
  to

  // 数据
  @Prop({ type: Object, default: {} })
  res

  // 打开新页面————文章页面
  redirect () {
    const route = this.$router.resolve(this.to)

    if (winopen) {
      winopen.close()
    }

    winopen = window.open(route.href, '_blank')
  }
}

export default ArticleCard
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
.el-image {
  display: block;
  width: 100%;
  height: 150px;
  margin: 0px auto;

  & /deep/ .image__error {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #f5f7fa;
    color: #909399;
    font-size: 30px;
  }
}
.card_body {
  width: 100%;
  height: 100px;
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
