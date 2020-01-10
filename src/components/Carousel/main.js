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
    val = parseInt(val)

    if (val >= this.items.length) {
      val = 0
    } else if (val < 0) {
      val = this.items.length - 1
    }

    this.activeIndex = val
  }

  prev () {
    this.setActiveIndex(this.activeIndex - 1)
  }

  next () {
    this.setActiveIndex(this.activeIndex + 1)
  }

  pointClickHandle (e) {
    if (e && e.preventDefault) {
      e.preventDefault()
    } else {
      window.event.returnValue = false
    }
  }
}

export default Main
