<template>
  <div class="article">
    <vue-scroll ref="vuescroll">
      <div class="box">
        <div class="box-content">
          <h1 class="header__title">Vue自定义组件中Props中接收数组或对象</h1>
          <div class="header__info">
            <span class="folder">
              <img src="https://www.easyicon.net/api/resizeApi.php?id=1183173&size=128" />
              <label>文件夹</label>
            </span>
            <time>2019.01.20 09:07:39</time>
            <span>访问 164</span>
          </div>
          <article class="content__text">
            <p> 今天我们来讨论一个历史八卦：武则天先跟李世民过了20年，始终没有怀孕，但是为什么和李治生活1年就有了孩子？这个问题涉及到了古人的私生活，请先允许有书君上柱香拜一拜古人，免得……（BOSS：快干活！）<br></p>
            <p>首先，要纠正题面的一个错误。武则天和李世民生活了十多年，没到二十年（读者：这有区别么？十多年没孩子也不正常啊）。但是十几年的时间居然没有为李世民生个一儿半女，又是什么原因呢？</p>
            <p>首先，从生育问题上分析：李世民儿子众多，不可能有生育问题；武则天和李治生了三男两女，证明也没有生育问题，所以生育问题的方面没有什么值得怀疑的地方。</p>
            <p>那么不是生育的问题，十几年的生活没有生儿育女，只能说明武则天在李世民那里根本不得宠。</p>
            <p>李世民后宫嫔妃们众多，比武则天颜值好的、身材好的一定也不少，以李世民好色的本性，怎么会专宠武则天一个人呢？而且武则天那时候也不过是一个小小的才人而已，能被唐太宗看上眼，宠幸几次已经算是运气不错了。假如武则天最后没有成为中国历史上唯一的女皇，估计史料上连这个人也查不到。</p>
            <p>所以说，武则天虽然入宫年头不短，但是跟李世民一起生活的时间一定不多。而就那么几次机会，武则天的肚子又不争气，没有怀上孩子，因此她最后才会去勾引李治。因为在宫中的女人，如果没有为皇帝生育过一儿半女的话，命运是很惨淡的，要么被赶出宫去，过平民的生活；要么去寺庙里当个尼姑，孤独终老。</p>
            <p>而武则天是一个有野心的女人，她不愿在这两者之间作出选择，但是又怕等李世民驾崩之后，自己已是残花败柳，所以她主动接近李治，是为了给自己找一个可以依靠的对象。</p>
            <p>要说武则天也是有眼光，那么多皇子里她选中了李治，李治最后也继承了皇位。他为了避嫌，先是将武则天送到感业寺里做了一段时间的尼姑，但是这期间又经常与武则天厮混，最后感觉时机差不多，直接就将武则天接回宫里。</p>
            <p>和李世民不同，李治特别宠爱武则天，言听计从。两个人如胶似漆般天天黏在一起，自然不需多少时日就能生儿育女了，而且这一生就是三男两女。</p>
            <p> 今天我们来讨论一个历史八卦：武则天先跟李世民过了20年，始终没有怀孕，但是为什么和李治生活1年就有了孩子？这个问题涉及到了古人的私生活，请先允许有书君上柱香拜一拜古人，免得……（BOSS：快干活！）<br></p>
            <p>首先，要纠正题面的一个错误。武则天和李世民生活了十多年，没到二十年（读者：这有区别么？十多年没孩子也不正常啊）。但是十几年的时间居然没有为李世民生个一儿半女，又是什么原因呢？</p>
            <p>首先，从生育问题上分析：李世民儿子众多，不可能有生育问题；武则天和李治生了三男两女，证明也没有生育问题，所以生育问题的方面没有什么值得怀疑的地方。</p>
            <p>那么不是生育的问题，十几年的生活没有生儿育女，只能说明武则天在李世民那里根本不得宠。</p>
            <p>李世民后宫嫔妃们众多，比武则天颜值好的、身材好的一定也不少，以李世民好色的本性，怎么会专宠武则天一个人呢？而且武则天那时候也不过是一个小小的才人而已，能被唐太宗看上眼，宠幸几次已经算是运气不错了。假如武则天最后没有成为中国历史上唯一的女皇，估计史料上连这个人也查不到。</p>
            <p>所以说，武则天虽然入宫年头不短，但是跟李世民一起生活的时间一定不多。而就那么几次机会，武则天的肚子又不争气，没有怀上孩子，因此她最后才会去勾引李治。因为在宫中的女人，如果没有为皇帝生育过一儿半女的话，命运是很惨淡的，要么被赶出宫去，过平民的生活；要么去寺庙里当个尼姑，孤独终老。</p>
            <p>而武则天是一个有野心的女人，她不愿在这两者之间作出选择，但是又怕等李世民驾崩之后，自己已是残花败柳，所以她主动接近李治，是为了给自己找一个可以依靠的对象。</p>
            <p>要说武则天也是有眼光，那么多皇子里她选中了李治，李治最后也继承了皇位。他为了避嫌，先是将武则天送到感业寺里做了一段时间的尼姑，但是这期间又经常与武则天厮混，最后感觉时机差不多，直接就将武则天接回宫里。</p>
            <p>和李世民不同，李治特别宠爱武则天，言听计从。两个人如胶似漆般天天黏在一起，自然不需多少时日就能生儿育女了，而且这一生就是三男两女。</p>
          </article>
        </div>
        <comment></comment>
        <back-top :target="target">
          <el-button icon="el-icon-caret-top" circle></el-button>
        </back-top>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
/**
 * 文章页面
 */
import Comment from '@/components/Comment'
import BackTop from '@/components/BackTop'

export default {
  name: 'Article',
  components: {
    Comment,
    BackTop
  },
  data () {
    return {
      target: null
    }
  },
  mounted () {
    this.target = this.$refs.vuescroll
  }
}
</script>

<style lang="less" scoped>
.article {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.box {
  width: 730px;
  margin: 0px auto;
  overflow: hidden;

  &>.box-content {
    background-color: white;
    margin: 10px 0px;
    margin-bottom: 96px;
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
    line-height: 30px;

    &>*:not(:last-child) {
      margin-right: 10px;
    }
    &>.folder>img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
  }
  &>.content__text {
    font-size: 16px;
    line-height: 28px;
    font-weight: 400;
    color: #404040;
    font-feature-settings: 'liga' 0, 'calt' 0;
    letter-spacing: 1px;
    white-space: pre-wrap;
    text-size-adjust: 100%;
    
    & *::selection {
      background-color: #DEEDCB;
    }
  }
}
</style>
