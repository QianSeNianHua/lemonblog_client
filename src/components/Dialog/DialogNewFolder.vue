<template>
  <el-dialog
    :visible.sync="dlVisible" :close-on-click-modal="false" :close-on-press-escape="false"
    @close="closeHandle" center width="400px">
    <div class="header" slot="title">
      新建分类文件夹
    </div>
    <el-form :model="form" :rules="rules" ref="refForm">
      <el-form-item>
        <el-image :src="form.thumbnailURL">
          <div slot="error" class="imageSlot" @click="fileClickHandle">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <input
          type="file" hidden ref="refFile"
          :value="form.thumbnailURL" accept="image/png, image/jpeg, image/jpg, image/gif" @change="fileChangeHandle">
      </el-form-item>
      <el-form-item class="name" label="名称" prop="folderName">
        <el-input v-model="form.folderName" placeholder="填写名称，不超过50字"></el-input>
      </el-form-item>
    </el-form>
    <div class="footer" slot="footer">
      <el-button type="primary" @click="confirmHandle">确定</el-button>
      <el-button @click="cancleHandle">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
/**
 * 弹窗，创建分类文件夹
 */
import { Vue, Component, PropSync, Ref } from 'vue-property-decorator'

@Component
class DialogNewFolder extends Vue {
  // 此组件的显示隐藏
  @PropSync('visible', { type: Boolean, default: false })
  dlVisible

  // 表单数据
  form = {
    folderName: '', // 文件夹名称
    thumbnailURL: null // 缩略图
  }
  // 表单验证
  rules = {
    folderName: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { max: 50, message: '长度不超过50个字', trigger: 'blur' }
    ]
  }

  @Ref()
  refForm

  @Ref()
  refFile

  // 关闭事件
  closeHandle () {

  }

  // 确认事件
  confirmHandle () {
    this.refForm.validate(valid => {
      if (valid) {

      } else {
        return false
      }
    })
  }

  // 取消弹窗事件
  cancleHandle () {
    this.dlVisible = false

    this.form.folderName = ''
    this.form.thumbnailURL = null
  }

  // 选择文件事件
  fileClickHandle () {
    this.form.thumbnailURL = ''
    this.refFile.click()
  }

  // 选择文件框改变事件
  fileChangeHandle (event) {
    this.form.thumbnailURL = event.srcElement.value
  }
}

export default DialogNewFolder
</script>

<style lang="less" scoped>
.header {
  font-size: 20px;
  font-weight: bold;
}
.el-dialog__wrapper {
  /deep/ .el-dialog__header {
    padding: 30px 50px 10px;
  }
  /deep/ .el-dialog__body {
    padding: 25px 50px 10px;
  }
  /deep/ .el-dialog__footer {
    padding: 20px 50px 30px;
  }
}
.el-form-item.is-required.name:not(.is-no-asterisk) {
  /deep/ .el-form-item__content {
    margin-left: 50px;
  }
  /deep/ .el-form-item__label::before {
    content: '';
    width: 0px;
  }
}
.el-image {
  display: block;
}
.el-image /deep/ .imageSlot {
  width: 100px;
  height: 100px;
  background-color: #409EFF;
  text-align: center;
  line-height: 110px;
  border-radius: 5px;
  margin: 0px auto;
  cursor: pointer;

  i::before {
    font-size: 30px;
    color: white;
  }
}
</style>
