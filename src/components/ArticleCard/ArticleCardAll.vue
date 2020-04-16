<template>
  <div class="content_list" :data-year="res.year">
    <div class="date">
      <span class="date_title">{{ res.month }}月{{ res.date }}日</span>
      <span class="date_point"></span>
    </div>
    <div class="list">
      <slot :list="res.list"></slot>
    </div>
  </div>
</template>

<script>
/**
 * 文章列表
 */
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
class ArticleCardAll extends Vue {
  // [{year: '', month: '', date: '', list: []}] 第一层同日，第二层同一天的文章
  @Prop({ default: { list: [] } })
  res
}

export default ArticleCardAll
</script>

<style lang="less" scoped>
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
    color: var(--color-contrast-ruby);
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
      background-color: var(--color-contrast-ruby);
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
