<template>
  <div class="box">
    <section>
      <h1 title="进入博客" @click="goto">{{ nickname }}</h1>
      <p class="desc">前端程序员</p>
      <div class="mess">
        <p>#你愿做我的账中妖👦👧么#</p>
      </div>
    </section>
  </div>
</template>

<script>
/**
 * 博客首页
 */
import { Vue, Component } from 'vue-property-decorator'
import * as API from '@/api'

@Component()
class Home extends Vue {
  nickname = '博客'

  mounted () {
    // const userUUID = this.$route.query.id

    // if (!userUUID) {
    //   this.nickname = '博客'
    // } else {
    //   API.user.homeInfo(userUUID).then(res => {
    //     if (res.code !== 0) return

    //     const data = res.data

    //     if (Reflect.ownKeys(data).length > 0) {
    //       this.nickname = data.nickname

    //       this.$store.dispatch('setUserUUID', userUUID)
    //     } else {
    //       this.nickname = '博客'
    //     }
    //   })
    // }
  }

  // 跳转到分类页面
  goto () {
    this.$router.push({ name: 'PanelCategory' })
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
