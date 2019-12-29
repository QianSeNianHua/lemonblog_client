<template>
  <div class="docBrief">
    <div class="content_list">
      <div class="date">
        <span class="date_title">12月27日</span>
        <span class="date_point"></span>
      </div>
      <div class="list">
        <article-card />
        <article-card />
        <article-card />
      </div>
    </div>
    <div class="content_list">
      <div class="date">
        <span class="date_title">12月26日</span>
        <span class="date_point"></span>
      </div>
      <div class="list">
        <article-card />
      </div>
    </div>
    <div class="content_list">
      <div class="date">
        <span class="date_title">12月25日</span>
        <span class="date_point"></span>
      </div>
      <div class="list">
        <article-card />
        <article-card />
        <article-card />
        <article-card />
        <article-card />
        <article-card />
        <article-card />
        <article-card />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 文档
 */
import ArticleCard from '@/components/ArticleCard'

export default {
  name: 'DocBrief',
  components: { ArticleCard }
}
</script>

<style lang="less" scoped>
@media screen and (max-width: 860px) {
  .docBrief {
    width: 510px;
  }
}
@media screen and (min-width: 860px) and (max-width: 1210px) {
  .docBrief {
    width: 860px;
  }
}
@media screen and (min-width: 1210px) {
  .docBrief {
    width: 1210px;
  }
}
.docBrief {
  margin: 0px auto;
}
.content_list {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.date {
  width: 160px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;

  &>.date_title {
    width: 120px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-top: 100px;
    color: orange;
  }
  &>.date_point {
    width: 5px;
    float: left;
    background-color: rgba(0,0,0,0.05);
    position: relative;

    &::before {
      content: '';
      display: block;
      width: 12px;
      height: 12px;
      background-color: orange;
      border-radius: 6px;
      position: absolute;
      top: 108px;
      left: -4px;
    }
  }
}
.list {
  flex-grow: 1;
  float: left;

  &>.articleCard {
    margin: 15px 50px;
    margin-left: 0px;
  }
}
</style>
