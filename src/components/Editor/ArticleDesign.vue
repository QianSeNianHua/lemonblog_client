<template>
  <div class="articleDesign">
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>
/**
 * CKEditor编辑器
 */

import { Vue, Component } from 'vue-property-decorator'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

@Component
class ArticleDesign extends Vue {
  // 编辑器
  editor = ClassicEditor
  // 内容
  editorData = '<p>Content of the editor.</p>'
  // 配置
  editorConfig = {}
}

export default ArticleDesign
</script>

<style lang="less" scoped>
</style>
