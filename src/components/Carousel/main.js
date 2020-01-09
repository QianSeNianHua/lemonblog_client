import { Vue, Component } from 'vue-property-decorator'

@Component
class Main extends Vue {
  updateItems () {
    this.items = this.$children.filter(child => child.$options.name === 'CarouselItem')
  }

  resetItemPosition (oldIndex) {
    this.items.forEach((item, index) => {
      item.translateItem(index, this.activeIndex, oldIndex)
    })
  }

  setActiveIndex (val) {
    this.activeIndex = val
  }
}

export default Main
