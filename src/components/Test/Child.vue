<template>
  <div class="child" @click="sayHello">
    {{ computedMsg }}
    {{ syncedPropB }}
    {{ word }}
  </div>
</template>

<script>
/**
 * 参考链接：https://juejin.im/post/5d42a45cf265da03e4673ea2
 */

import { Component, Vue, Prop, PropSync, Model, Watch, Emit, Ref, Mixins } from 'vue-property-decorator'
import MyMixin from './MyMixin.js'

@Component
class Child extends Mixins(MyMixin) {
  // data
  msg = 123
  waText = 'aa'

  // propA 只能由父组件设值，子组件不能更改值
  @Prop({ type: Number, default: 0 })
  propA

  // :propB.sync 子组件可以设值，并更新到父组件
  @PropSync('propB', { type: String })
  syncedPropB

  // model
  @Model('change', { type: String })
  word

  // mounted
  mounted () {
  }

  // computed
  get computedMsg () {
    return 'computed ' + this.msg
  }

  // computed不缓存，return this.$refs.button
  @Ref()
  button

  // watch
  @Watch('waText')
  onWATextChanged (val, oldVal) {
    console.log(`${oldVal} ---> ${val}`)
  }

  // methods
  sayHello () {
    console.log(this.msg)

    this.syncedPropB = this.msg++
  }

  // this.$emit('add-count', n)
  @Emit()
  addCount (n) {
    return n
  }
}

export default Child
</script>

<style>

</style>
