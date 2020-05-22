<template>
  <div class="inputFile">
    <el-image
      :src="srcSync" :fit="fit" :style="style"
      @click.native="fileClickHandle" :lazy="true">
      <div slot="error">
        <slot></slot>
      </div>
    </el-image>
    <input
      type="file" hidden ref="refFile"
      accept="image/png, image/jpeg, image/jpg, image/gif" @change="fileChangeHandle">
  </div>
</template>

<script>
/**
 * 图片上传
 * @propSrc src 图片地址
 * @propSrc file 图片文件
 * @prop shape 形状
 * @prop fit 填充类型
 * @prop width 图片宽度
 * @prop height 图片高度
 */
import { Vue, Component, Prop, Ref, PropSync } from 'vue-property-decorator'

@Component
class InputFile extends Vue {
  // 图片地址
  @PropSync('src', { type: String, default: '' })
  srcSync

  // 图片文件
  @PropSync('file', { type: File, default: null })
  fileSync

  // 形状，circle 默认，圆形；square 圆角方形
  @Prop({ type: String, default: 'circle' })
  shape

  // 填充类型, fill, contain, cover, none, scale-down
  @Prop({ type: String, default: 'contain' })
  fit

  // 图片宽度
  @Prop({ type: Number, default: 50 })
  width

  // 图片高度
  @Prop({ type: Number, default: 50 })
  height

  @Ref()
  refFile

  // 样式
  get style () {
    return {
      width: this.width + 'px',
      height: this.height + 'px',
      'border-radius': this.shape === 'circle' ? this.width / 2 + 'px' : '5px'
    }
  }

  // 打开文件选择窗
  fileClickHandle () {
    let reg = /^blob:/i
    if (reg.test(this.srcSync)) {
      URL.revokeObjectURL(this.srcSync)
    }

    this.refFile.value = ''
    this.refFile.click()
  }

  // 文件选择后
  fileChangeHandle (event) {
    if (event.srcElement.files.length === 0) return

    const file = this.fileSync = event.srcElement.files[0]
    const src = this.srcSync = URL.createObjectURL(file)
  }
}

export default InputFile
</script>

<style lang="less" scoped>
.inputFile {
  display: inline-block;

  &>.el-image {
    display: block;
    cursor: pointer;
    text-align: center;

    /deep/ * {
      width: inherit;
      height: inherit;
    }
  }
}
</style>
