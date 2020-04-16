<template>
  <div class="box">
    <section>
      <h1 title="进入博客" @click="goto">{{ res.nickname || '博客' }}</h1>
      <p class="desc">前端程序员</p>
      <div class="mess">
        <p>{{ res.briefIntro }}</p>
      </div>
    </section>
  </div>
</template>

<script>
/**
 * 博客首页
 */
import { Vue, Component, Watch } from 'vue-property-decorator'
import * as API from '@/api'

@Component()
class Home extends Vue {
  // 接口数据
  res = {}

  mounted () {
    this.getData(this.$route.params.userId)
  }

  @Watch('$route')
  onRouteChanged (to, from) {
    this.getData(this.$route.params.userId)
  }

  // 获取用户id
  get userUUID () {
    return this.$store.getters.getUserUUID
  }

  getData (userUUID) {
    API.user.userInfo(userUUID).then(res => {
      if (res.code !== 0) return

      const data = res.data

      if (Reflect.ownKeys(data).length > 0) {
        this.res = data

        this.$store.dispatch('setUserUUID', userUUID)
      } else {
        // 查找不到用户
        this.$router.replace({ name: 'NotFound' })
      }
    })
  }

  // 跳转到分类页面
  goto () {
    this.$router.push({ name: 'PanelCategory', params: { id: this.userUUID } })
  }
}

export default Home
</script>

<style lang="less" scoped>
@keyframes textFadeIn {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

.box {
  width: 100vw;
  height: 100vh;
  background: url('~@/assets/images/header-bg.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  user-select: none;
}
section {
  color: white;
  text-align: center;
  text-shadow: 0px 2px 6px #000;

  &>h1 {
    font-size: 50px;
    font-weight: 700px;
    cursor: pointer;
    animation: textFadeIn 1s ease 0.5s 1;
    animation-fill-mode: forwards;
    opacity: 0;

    &:hover {
      color: rgba(255,255,255,0.8);
    }
  }
  &>.desc {
    font-size: 20px;
    font-weight: 400px;
    color: rgba(255,255,255,0.8);
    margin-top: 10px;
    animation: textFadeIn 2s ease 0s 1;
    animation-fill-mode: forwards;
    opacity: 0;
  }
  &>.mess {
    color: rgba(255,255,255,0.8);
    font-size: 14px;
    margin-top: 10px;
    line-height: 24px;
    animation: textFadeIn 2s ease 0s 1;
    animation-fill-mode: forwards;
    opacity: 0;
  }
}
</style>
