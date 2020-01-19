<template>
  <div class="emojiStore">
    <carousel-panel height="180px" @mousewheel.native.stop="throttledScrollHandle" ref="refCarousel">
      <carousel-item v-for="(group, i) in getEmoji" :key="i">
        <ul>
          <li
            v-for="(item, j) in group" :key="j" @click="command(item)"
          >
            {{ item }}
          </li>
        </ul>
      </carousel-item>
    </carousel-panel>
  </div>
</template>

<script>
/**
 * 评论用的表情库
 * @event @command 表情符号
 */
import { Vue, Component, Ref, Emit } from 'vue-property-decorator'
import { throttle } from 'throttle-debounce'
import CarouselPanel from '@/components/Carousel/Carousel-panel'
import CarouselItem from '@/components/Carousel/Carousel-item'
import { emoji } from '@/config/emoji.js'
import { StringjiExchangeEmoji } from '@/until/emojiExchange.js'

@Component({
  components: {
    CarouselPanel,
    CarouselItem
  }
})
class EmojiStore extends Vue {
  @Ref()
  refCarousel

  @Emit()
  command (str) {
    return str
  }

  // 节流控制
  get throttledScrollHandle () {
    return throttle(700, this.scrollHandle)
  }

  get getEmoji () {
    return emoji.map(items => {
      return items.map(item => {
        return StringjiExchangeEmoji(item)
      })
    })
  }

  scrollHandle (e) {
    // left向左滚动，right向右滚动
    e.deltaY < 0 ? this.refCarousel.prev() : this.refCarousel.next()
  }
}

export default EmojiStore
</script>

<style lang="less" scoped>
.emojiStore {
  width: 290px;
  height: 180px;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 4px;
  font-size: 24px;
}
ul, li {
  list-style: none;
  outline: none;
}
ul {
  width: 100%;
  height: 100%;
  padding: 12px 16px;
  // padding-bottom: 44px;
  padding-bottom: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  justify-content: flex-start;
  align-content: flex-start;
}
li {
  padding: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
}
</style>
