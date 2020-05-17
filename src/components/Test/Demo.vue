<template>
  <div>
    <input v-for="(item, index) in arr" :key="index" v-model="arrs[index].val">
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component()
class Demo extends Vue {
  arr = [1, 2, 3, 4]
  arrs = [{ val: '' }, { val: '' }, { val: '' }, { val: '' }]

  updated () {
    console.log(123)
  }
}

export default Demo
</script>

<style lang="less" scoped>

</style>
