<template>
  <div class="article">
    <vue-scroll>
      <div class="box">
        <div class="box-content">
          <h1 class="header__title">Vue自定义组件中Props中接收数组或对象</h1>
          <div class="header__info">
            <span class="folder">
              <img src="https://www.easyicon.net/api/resizeApi.php?id=1183173&size=128" />文件夹
            </span>
            <time>2019.01.20 09:07:39</time>
            <span>访问量 164</span>
          </div>
        </div>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
export default {
  name: 'Article'
}
</script>

<style lang="less" scoped>
.article {
  width: 100%;
  height: 100%;
}
.box {
  width: 730px;
  margin: 0px auto;
  overflow: hidden;

  &>.box-content {
    background-color: white;
    margin: 10px 0px;
    padding: 24px;
  }
}
.box-content {
  &>.header__title {
    font-size: 30px;
    color: #404040;
    font-weight: 700px;
    margin-bottom: 15px;
  }
  &>.header__info {
    font-size: 13px;
    color: #969696;
    margin-bottom: 32px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    // &>* {
    //   display: inline-block;
    //   height: 30px;
    //   line-height: 30px;
    //   overflow: hidden;
    // }
    &>*:not(:last-child) {
      margin-right: 10px;
    }
    &>.folder>img {
      width: 20px;
      height: 20px;
      margin-top: 5px;
    }
  }
}

</style>
