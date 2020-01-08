import { Component, Vue } from 'vue-property-decorator'

@Component
class MyMixin extends Vue {
  init () {
    console.log('MyMixin')
  }
}

export default MyMixin
