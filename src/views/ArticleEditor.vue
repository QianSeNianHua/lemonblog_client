<template>
  <div class="articleEditor">
    <div class="content">
      <input-file
        :width="677" :height="197" shape="square"
        src="" :value="imgFile">
        <i class="el-icon-picture-outline"></i>
      </input-file>
      <el-input
        type="textarea" placeholder="请输入标题（最多50个字）" :rows="1"
        v-model="title" :maxlength="50" show-word-limit
        :autosize="true" resize="none" @keydown.native="noLineHandle">
      </el-input>
      <article-design></article-design>
    </div>
  </div>
</template>

<script>
/**
 * 文章编辑器
 */

import { Vue, Component, Watch } from 'vue-property-decorator'
import InputFile from '@/components/InputFile'
import ArticleDesign from '@/components/Editor/ArticleDesign'

@Component({
  components: {
    InputFile,
    ArticleDesign
  }
})
class ArticleEditor extends Vue {
  // 图片
  imgFile = ''
  // 标题
  title = ''

  @Watch('title')
  onTitleChanged (nV, oV) {
    this.title = nV.replace(/[\r\n]/g, '')
  }

  // 标题禁止换行
  noLineHandle (event) {
    if (event.keyCode === 13) {
      event.returnVlaue = false

      event.preventDefault()
    }
  }
}

export default ArticleEditor
</script>

<style lang="less" scoped>
.articleEditor {
  background-color: #F9F9F9;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.content {
  width: 677px;
  margin: 40px auto;
}
.inputFile {
  float: left;
  background-color: #DBDEE5;

  /deep/ i {
    font-size: 80px;
    line-height: 197px;
    color: white;
  }
}
.el-textarea {
  margin: 16px 0px;

  /deep/ textarea {
    font-size: 32px;
    font-weight: 600;
    outline: none;
    border: 0px;
    padding-bottom: 21px;
    color: #1a1a1a;
    font-weight: 600;
  }
}
</style>
