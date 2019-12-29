<template>
  <div class="navbar">
    <div class="box">
      <div class="left_panel">
        <div class="nickname" @click="toHome">博客</div>
        <el-menu mode="horizontal" :default-active="routeIndex" :router="true">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/category">分类</el-menu-item>
          <el-menu-item index="/docBrief">文档</el-menu-item>
          <el-menu-item index="/openSource">我的开源</el-menu-item>
        </el-menu>
      </div>
      <div class="right_panel">
        <el-input placeholder="搜索" v-model="search" @input="$emit('input', search)">
          <i slot="suffix" class="el-input__icon el-icon-search btn-search" />
        </el-input>
        <el-avatar icon="el-icon-user-solid" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 导航栏
 * @param v-model 搜索关键字
 */

export default {
  name: 'Navbar',
  model: {
    prop: 'word',
    event: 'input'
  },
  props: {
    word: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // 搜索关键字
      search: ''
    }
  },
  computed: {
    // 获取路由名字，设置当前导航索引
    routeIndex () {
      return this.$route.path
    }
  },
  watch: {
    word (value) {
      this.search = value
    }
  },
  methods: {
    toHome () {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  height: 60px;
  user-select: none;
  // border-bottom: solid 1px #e6e6e6;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
}
.left_panel {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-shrink: 0;

  .nickname {
    height: 100%;
    margin: 0px 30px;
    text-align: center;
    line-height: 60px;
    font-size: 25px;
    font-weight: bold;
    color: #409EFF;
    cursor: pointer;
  }
  .el-menu {
    display: inline-block;

    &.el-menu--horizontal {
      border: none;
    }
  }
}
.right_panel {
  height: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  
  .el-input {
    border-radius: 20px;
    overflow: hidden;
    margin-right: 20px;
    
    /deep/ input {
      transition-property: width, padding;
      transition-duration: 0.7s;
      transition-timing-function: ease;
      width: 40px;
      padding-right: 23px;
      padding-left: 15px;
      border-radius: 20px;
    }
    &:hover /deep/ input {
      width: 220px;
      padding-left: 15px;
      padding-right: 40px;
    }
    /deep/ input:focus {
      width: 220px;
      padding-left: 15px;
      padding-right: 40px;
    }
    /deep/.el-input__suffix {
      width: 38px;
      height: 38px;
      top: 1px;
      right: 1px;
    }      
  }
  .btn-search {
    width: 100%;
    height: 100%;
    cursor: pointer;
    flex-shrink: 0;
  }
  .el-avatar {
    width: 45px;
    height: 45px;
    cursor: pointer;
    margin-right: 25px;
    flex-shrink: 0;
  }
}
</style>
