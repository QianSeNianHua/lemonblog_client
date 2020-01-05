<template>
  <ul class="briefState">
    <slot></slot>
  </ul>
</template>

<script>
/**
 * 评论区 ul
 */

export default {
  name: 'BriefState'
}
</script>

<style lang="less" scoped>
ul, li {
  list-style: none;
}
</style>
