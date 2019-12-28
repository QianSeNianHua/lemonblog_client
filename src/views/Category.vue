<template>
  <div class="category">
    <folder-list />
    <folder-list />
    <folder-list />
    <folder-list />
  </div>
</template>

<script>
/**
 * 分类页面
 */
import FolderList from '@/components/FolderList'

export default {
  name: 'Category',
  components: { FolderList },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.category {
  width: 730px;
  margin: 20px auto;
}
</style>
