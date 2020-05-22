<template>
  <el-dialog
    :visible.sync="dlVisible" :close-on-click-modal="false" :close-on-press-escape="false"
    @close="closeHandle" center width="400px">
    <div class="header" slot="title">{{ title }}</div>
    <el-form :model="res" :rules="rules" ref="refForm">
      <el-form-item class="file">
        <input-file
          :src.sync="res.thumbnailURL" :file.sync="file" :width="100"
          :height="100" shape="square">
          <i class="el-icon-picture-outline"></i>
        </input-file>
      </el-form-item>
      <el-form-item class="name" label="名称" prop="folderName">
        <el-input v-model="res.folderName" placeholder="填写名称，不超过50字"></el-input>
      </el-form-item>
    </el-form>
    <div class="footer" slot="footer">
      <el-button type="primary" @click="confirmHandle">确定</el-button>
      <el-button @click="dlVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
/**
 * 弹窗，创建分类文件夹
 * @propSync {boolean} visible 弹窗是否显示
 * @emit confirm 确认后返回form数据
 * @prop {string} title 标题
 * @prop {object} res 数据——{ thumbnailURL: string, folderName: string, folderId: number | null } 传folderId表示修改
 */
import { Vue, Component, PropSync, Ref, Emit, Prop } from 'vue-property-decorator'
import InputFile from '@/components/InputFile'
import * as API from '@/api'
import CompressImg from '@/until/compressImg'

@Component({
  components: {
    InputFile
  }
})
class DialogNewFolder extends Vue {
  // 此组件的显示隐藏
  @PropSync('visible', { type: Boolean, default: false })
  dlVisible

  // 标题
  @Prop({ type: String, default: '新建分类文件夹' })
  title

  // 传进来的数据
  @Prop({ type: Object, default: { thumbnailURL: '', folderName: '', folderId: null } })
  res

  // 图片文件
  file = null
  // 表单验证
  rules = {
    folderName: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { max: 50, message: '长度不超过50个字', trigger: 'blur' }
    ]
  }

  @Ref()
  refForm

  // 关闭事件
  closeHandle () {
    let reg = /^blob:/i
    if (reg.test(this.res.thumbnailURL)) {
      URL.revokeObjectURL(this.res.thumbnailURL)
    }

    this.res.thumbnailURL = ''
    this.res.folderName = ''
    this.res.folderId = null
    this.file = null
  }

  // 确认事件
  @Emit('confirm')
  async confirmHandle () {
    const vali = async () => {
      return new Promise((resolve, reject) => {
        this.refForm.validate(valid => {
          if (!valid) return

          if (!this.res.thumbnailURL) {
            this.$message.warning('需要上传图片，尺寸100×100px，大小100kb')

            return
          }

          resolve()
        })
      })
    }

    await vali()

    let form = new FormData()

    // 处理图片
    if (this.file !== null) {
      this.file = await this.compress()
      form.append('file', this.file)
    }
    if (this.res.folderId !== null) {
      form.append('folderId', this.res.folderId)
    }
    form.append('folderName', this.res.folderName)

    return form
  }

  // 图片压缩
  async compress () {
    const size = this.file.size / 1024

    let file = this.file
    if (size > 100) {
      file = await CompressImg(this.res.thumbnailURL, 250, 250)
    }

    return file
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
.el-form-item.file {
  /deep/ .el-form-item__content {
    position: initial;
    text-align: center;
    line-height: initial;

    .el-image {
      background-color: #409EFF;
      text-align: center;
      line-height: 110px;

      i::before {
        font-size: 30px;
        color: white;
      }
    }
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
</style>
