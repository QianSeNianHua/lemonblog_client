<template>
  <div class="briefIntroModify">
    <span v-show="!introEdited">{{ briefIntro }}</span>
    <el-input
      type="textarea" v-model="briefIntroNew" :rows="3"
      :autosize="{ minRows: 3, maxRows: 5 }" show-word-limit :maxlength="40"
      v-show="introEdited"></el-input>
    <a v-show="!introEdited" @click="modifyHandle">设置</a>
    <div class="right" v-show="introEdited">
      <el-button size="medium" @click="cancleHandle">取消</el-button>
      <el-button type="primary" size="medium" @click="confirmHandle">确认</el-button>
    </div>
  </div>
</template>

<script>
/**
 * 修改个人简介
 * @prop value 内容
 * @emit confirm 确认
 */

import { Vue, Component, PropSync, Emit } from 'vue-property-decorator'

@Component
class BriefIntroModify extends Vue {
  // 个性签名
  @PropSync('value', { type: String, default: '' })
  briefIntro

  // 只读和可编辑的切换
  introEdited = false
  // 修改后的值
  briefIntroNew = ''

  // 修改
  modifyHandle () {
    this.briefIntroNew = this.briefIntro
    this.introEdited = true
  }

  // 取消
  cancleHandle () {
    this.introEdited = false
    this.briefIntroNew = this.briefIntro
  }

  // 确认
  @Emit('confirm')
  confirmHandle () {
    this.briefIntro = this.briefIntroNew
    this.introEdited = false

    return this.briefIntroNew
  }
}

export default BriefIntroModify
</script>

<style lang="less" scoped>
.briefIntroModify {
  font-size: 16px;
  color: #383838;
  overflow: hidden;

  &>span {
    float: left;
    white-space: pre;
  }
  &>a {
    float: right;
    cursor: pointer;
    color: #2e68f8;
  }
  .right {
    float: right;
  }
  .el-textarea {
    width: 400px;

    /deep/ textarea {
      max-height: 117px;
    }
  }
}
</style>
