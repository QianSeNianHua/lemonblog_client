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
import { Getter } from 'vuex-class'
import * as API from '@/api'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

@Component
class ArticleDesign extends Vue {
  // 编辑器
  editor = ClassicEditor
  // 内容
  editorData = '<p>Content of the editor.</p>'
  // 配置
  editorConfig = {}

  @Getter
  getIsLogin

  created () {
    this.apiUserInfoIn().then(res => {

    }).catch(_err => {
      this.$router.replace({ name: 'NotFound' })
    })
  }

  // 获取登录用户信息
  apiUserInfoIn () {
    return API.user.inUserInfo()
  }
}

export default ArticleDesign
</script>

<style lang="less" scoped>
</style>
