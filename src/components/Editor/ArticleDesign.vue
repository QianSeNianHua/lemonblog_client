<template>
  <div class="articleDesign">
    <ckeditor
      :editor="editor" v-model="editorDataSync" :config="editorConfig"
      @ready="readyHandle"></ckeditor>
  </div>
</template>

<script>
/**
 * CKEditor编辑器
 * @propSync {string} data 内容
 */
import { Vue, Component, PropSync } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import * as API from '@/api'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

@Component
class ArticleDesign extends Vue {
  // 内容
  @PropSync('data', { type: String, default: '' })
  editorDataSync

  // 编辑器
  editor = ClassicEditor
  // 配置
  editorConfig = {}

  // ckeditor初始化后
  readyHandle (editor) {
    let el = document.createElement('div')
    el.classList.add('ck')
    el.classList.add('ck-reset_all')
    el.appendChild(editor.ui.view.toolbar.element)
    document.getElementById('ckToolbar').appendChild(el)
  }
}

export default ArticleDesign
</script>

<style lang="less" scoped>
.articleDesign {
  background-color: white;
  min-height: calc(100vh - 100px);
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>

<style>
.ck.ck-toolbar {
  border: 0px;
}
.ck.ck-editor__main>.ck-editor__editable {
  min-height: calc(100vh - 100px);
  border-width: 0px;
  background-color: initial;
  padding: 40px;
}
.ck.ck-editor__main>.ck-editor__editable.ck-focused {
  border-width: 0px;
  box-shadow: none;
}
</style>
