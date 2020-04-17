<template>
  <span :class="{ checkbox: true, notAllowed: !flag }">
    <input
      type="checkbox" :id="id" class="checkboxInput"
      @change="changeHandle" :checked="modelChecked">
    <label :for="flag ? id : ''"></label>
  </span>
</template>

<script>
/**
 * 多选框
 */
import { Vue, Component, Prop, Model, PropSync } from 'vue-property-decorator'
import { v4 as uuidv4 } from 'uuid'

@Component
class Checkbox extends Vue {
  // 禁止使用，true表示可以使用，false表示不可以使用
  @Prop({ type: Boolean, default: true })
  flag

  // 选中状态，true表示被选中，false表示不被选中
  @Model('change', { type: Boolean })
  modelChecked

  // 随机id
  id = ''

  mounted () {
    this.id = uuidv4().replace('-', '').substr(0, 12)
  }

  // input change事件
  changeHandle (event) {
    this.$emit('change', event.target.checked)
  }
}

export default Checkbox
</script>

<style lang="less" scoped>
.checkbox {
  display: inline-block;
  width: 14px;
  height: 14px;
  position: relative;

  &.notAllowed {
    &>.checkboxInput+label {
      cursor: not-allowed;
      background-color: #edf2fc;
    }
  }
  &:not(.notAllowed) {
    &>.checkboxInput+label {
      cursor: pointer;
      background-color: #fff;

      &:hover {
        border-color: #409eff;
      }
    }
    &>.checkboxInput:checked+label {
      background-color: #409eff;
      border-color: #409eff;
    }
  }
}
.checkboxInput {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
.checkboxInput+label {
  display: block;
  width: 14px;
  height: 14px;
  line-height: 12px;
  text-align: center;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
}
.checkboxInput:checked+label::before {
  display: block;
  content: "\2713";
  text-align: center;
  font-size: 1px;
  // font-weight: bold;
  color: white;
}
</style>
