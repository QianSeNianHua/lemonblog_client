<template>
  <div class="nicknameModify">
    <span v-show="!nameEdited">{{ syncNickname }}</span>
    <a @click="nameModifyHandle" v-show="!nameEdited">修改</a>
    <el-input
      v-model="nicknameNew" v-show="nameEdited" maxlength="12"
      show-word-limit></el-input>
    <div class="right" v-show="nameEdited">
      <el-button size="medium" @click="nameCancleHandle">取消</el-button>
      <el-button
        type="primary" size="medium" @click="nameConfirmHandle"
        :disabled="!nicknameNew">
        确认
      </el-button>
    </div>
  </div>
</template>

<script>
/**
 * 修改用户昵称
 * @propSync nickname 用户昵称
 * @emit confirm 确认修改
 */

import { Vue, Component, PropSync, Emit } from 'vue-property-decorator'

@Component
class NicknameModify extends Vue {
  // 用户昵称
  @PropSync('nickname', { type: String, default: '' })
  syncNickname

  // 用户昵称，修改后的值
  nicknameNew = ''
  // 用户昵称，只读和可编辑的切换
  nameEdited = false

  // 用户昵称，修改
  nameModifyHandle () {
    this.nicknameNew = this.syncNickname
    this.nameEdited = true
  }
  // 用户昵称，取消
  nameCancleHandle () {
    this.nameEdited = false
    this.nicknameNew = this.syncNickname
  }
  // 用户昵称，确认
  @Emit('confirm')
  nameConfirmHandle () {
    this.nameEdited = false
    this.syncNickname = this.nicknameNew

    return this.nicknameNew
  }
}

export default NicknameModify
</script>

<style lang="less" scoped>
.nicknameModify {
  font-size: 16px;
  color: #383838;
  overflow: hidden;

  &>span {
    float: left;
  }
  &>a {
    float: right;
    cursor: pointer;
    color: #2e68f8;
  }
  &>span, &>a {
    height: 40px;
    line-height: 40px;
  }
  &>span {
    padding-left: 16px;
  }
  &>.right {
    float: right;
  }

  .el-input {
    width: auto;

    /deep/ input {
      width: 180px;
      font-size: 16px;
      padding-right: 45px;
    }
  }
  .el-button {
    margin-top: 2px;
  }
}
</style>
