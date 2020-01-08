<template>
  <div class="parent">
    <input type="text" v-model="word">
    <child
      :prop-a="1" :prop-b.sync="child" v-model="word"
      v-color="'red'"
    ></child>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import Child from './Child'

@Component({
  components: {
    Child
  },
  directives: {
    color: {
      bind: function (el, binding) {
        console.log(el)
      },
      inserted: function (el, binding) {
        console.log(binding)
      }
    }
  }
})
class Parent extends Vue {
  child = 'child'
  word = ''
}

export default Parent
</script>

<style>

</style>
