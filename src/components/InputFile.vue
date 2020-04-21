<template>
  <div class="inputFile">
    <el-image
      :src="src" :fit="fit" :style="style">
      <div slot="error" class="imageSlot" @click="fileClickHandle">
        <slot></slot>
      </div>
    </el-image>
    <input
      type="file" hidden ref="refFile"
      :value="value" accept="image/png, image/jpeg, image/jpg, image/gif" @change="fileChangeHandle">
  </div>
</template>

<script>
/**
 * 图片上传
 * @prop src 图片正确显示的地址
 * @prop value 文件内容
 * @prop shape 形状
 * @prop fit 填充类型
 * @prop width 图片宽度
 * @prop height 图片高度
 */
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'

@Component
class InputFile extends Vue {
  // 图片正确显示
  @Prop({ type: String, default: '' })
  src

  // 文件内容
  @Prop()
  value

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
    this.refFile.click()
  }

  // 文件选择后
  fileChangeHandle (event) {
    this.value = event.srcElement.value
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
