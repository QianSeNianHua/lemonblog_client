<template>
  <div class="inputFile">
    <el-image :src="str" :fit="fit">
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
 * @prop str 图片正确显示的地址
 * @prop value 文件内容
 * @prop shape 形状
 */
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'

@Component
class InputFile extends Vue {
  // 图片正确显示
  @Prop({ type: String, default: '' })
  str

  // 文件内容
  @Prop()
  value

  // 形状，circle 默认，圆形；square 圆角方形
  @Prop({ type: String, default: 'circle' })
  shape

  // 填充类型
  @Prop({ type: String, default: '' })
  fit

  @Ref()
  refFile

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

</style>
