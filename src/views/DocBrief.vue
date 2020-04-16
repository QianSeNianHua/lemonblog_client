<template>
  <div class="docBrief">
    <template v-if="res.rows.length > 0">
      <article-list
        :res="res" @page-change="pageChangeHandle" :total="pageTotal"></article-list>
    </template>
    <template v-else>
      <div class="none_panel">
        <icon-svg icon-class="none" class="i-icon icon-none"></icon-svg>
        <span>页面空数据</span>
      </div>
    </template>
  </div>
</template>

<script>
/**
 * 文档页面
 */
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import ArticleList from '@/components/ArticleCard/ArticleList'
import * as API from '@/api'

@Component({
  components: {
    ArticleList
  }
})
class DocBrief extends Vue {
  // 数据，包含全部文档的数据，和分类的文档的数据
  res = { rows: [] }
  // 页面数量
  pageTotal = 0

  @Watch('$route.params.userId', { immediate: true })
  onIdChanged (nV, oV) {
    // 全部文档
    this.getFileList(this.$route.params.userId)
  }

  // 接口获取全部文档列表
  getFileList (userUUID, current = 1) {
    API.file.getFileList(userUUID, null, current).then(res => {
      if (res.code !== 0) return

      const data = this.res = res.data
      this.pageTotal = data.count
    })
  }

  // 改变页码
  pageChangeHandle (current) {
    this.getFileList(this.$route.params.userId, current)
  }
}

export default DocBrief
</script>

<style lang="less" scoped>
.docBrief {
  width: 100%;
  height: 100%;
}
</style>

<style>
  :root {
    --color-contrast-ruby: #D8334A;
    --color-contrast-deep-ruby: #C22E42;
    --color-contrast-grapefruit: #ED5565;
    --color-contrast-deep-grapefruit: #D54C5B;
    --color-contrast-bittersweet: #FC6E51;
    --color-contrast-deep-bittersweet: #E26349;
    --color-contrast-sunflower: #FFCE54;
    --color-contrast-deep-sunflower: #E5B94B;
    --color-contrast-straw: #E8CE4D;
    --color-contrast-deep-straw: #D0B945;
    --color-contrast-grass: #A0D468;
    --color-contrast-deep-grass: #90BE5D;
    --color-contrast-mint: #48CFAD;
    --color-contrast-deep-mint: #41BA9B;
    --color-contrast-aqua: #4FC1E9;
    --color-contrast-deep-aqua: #47ADD1;
    --color-contrast-plum: #8067B7;
    --color-contrast-deep-plum: #735CA4;
    --color-contrast-lavender: #AC92EC;
    --color-contrast-deep-lavender: #9A83D4;
  }
</style>
