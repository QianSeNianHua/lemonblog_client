<template>
  <div class="folderList">
    <img :src="res.thumbnailURL" class="icon">
    <div class="content" :style="{ 'background-color': randomColor() }">
      <span class="text">{{ res.folderName }}</span>
      <span class="num">{{ res.countFile }}篇</span>
    </div>
  </div>
</template>

<script>
/**
 * 分类
 * @event to 页面跳转
 */
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { random } from '@/until/random.js'

const color = [ 'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green' ]

let count = []

@Component()
class FolderList extends Vue {
  // 数据
  @Prop({ type: Object, default: {} })
  res

  // 随机颜色
  randomColor () {
    if (count.length === 0) {
      count = [...color]
    }

    let cur = null

    while (true) {
      cur = random(0, color.length - 1)

      let flag = count.some((item, index) => {
        if (item === color[cur]) {
          return count.splice(index, 1)
        }
      })

      if (flag) break
    }

    return `var(--color-${color[cur]})`
  }
}

export default FolderList
</script>

<style lang="less" scoped>
.folderList {
  width: 100%;
  height: 120px;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 15px;
  }
}
img.icon {
  display: block;
  width: 70px;
  height: 70px;
  position: absolute;
  top: 0px;
  left: 0px;
  margin: 25px 0px;
  user-select: none;
}
.content {
  height: 100%;
  margin-left: 35px;
  background-color: var(--color-orange);
  padding: 25px;
  padding-left: 70px;
  padding-right: 70px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  cursor: default;

  &:hover {
    box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 0.5);
    color: #efefef;
  }
  &>.text {
    font-size: 27px;
    font-weight: 500;
    line-height: 70px;
  }
  &>.num {
    float: right;
    line-height: 70px;
  }
}
</style>

<style>
@import '~@/until/style/folderListColor.less';
</style>
