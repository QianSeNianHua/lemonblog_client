<template>
  <div class="notFoundHome">
    <div class="error">
      <span class="nickname">博客</span>
      <el-image :src="require('@/assets/images/404.jpg')">
        <div slot="error">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </div>
  </div>
</template>

<script>
/**
 * 404
 */
import { Vue, Component } from 'vue-property-decorator'

@Component()
class NotFoundHome extends Vue {

}

export default NotFoundHome
</script>

<style lang="less" scoped>
.notFoundHome {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.nickname {
  position: absolute;
  left: 40px;
  top: 40px;
  font-size: 40px;
  font-weight: bold;
  color: #409EFF;
  letter-spacing: 6px;
  cursor: default;
}
.error {
  position: relative;
  padding-top: 93px;
  width: 100%;
  text-align: center;
}
.el-image {
  width: 50%;
}
</style>
