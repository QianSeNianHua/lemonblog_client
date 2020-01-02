<template>
  <div class="folderList" @click="$emit('to')">
    <img src="https://www.easyicon.net/api/resizeApi.php?id=1183173&size=128" class="icon">
    <div class="content" :style="{ 'background-color': randomColor() }">
      <span class="text">Javascript文件夹</span>
      <span class="num">30篇</span>
    </div>
  </div>
</template>

<script>
/**
 * 分类
 * @event to 页面跳转
 */

export default {
  name: 'FolderList',
  data () {
    return {
    }
  },
  created () {
    this.color = [ 'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green' ]
  },
  mounted () {
  },
  methods: {
    // 随机颜色
    randomColor () {
      const lower = 1
      const upper = this.color.length

      let cur = Math.floor(Math.random() * (upper - lower + 1)) + lower

      return `var(--color-${this.color[cur - 1]})`
    }
  }
}
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
  :root {
    --color-red: #F34336;
    --color-pink: #E81E63;
    --color-purple: #9C27B0;
    --color-deep-purple: #673AB7;
    --color-indigo: #3F51B5;
    --color-blue: #2196F2;
    --color-light-blue: #03A9F3;
    --color-cyan: #00BCD3;
    --color-teal: #009688;
    --color-green: #4CAF50;
    --color-light-green: #8BC24A;
    --color-lime: #CCDB39;
    --color-yellow: #FEEA3B;
    --color-amber: #FEC007;
    --color-orange: #FF9800;
    --color-deep-orange: #FE5722;
    --color-brown: #795548;
    --color-grey: #9E9E9E;
    --color-blue-grey: #607D8B;
  }
</style>
