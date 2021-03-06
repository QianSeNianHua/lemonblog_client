import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vuescroll from 'vuescroll/dist/vuescroll-native' // 滚动条
import IconSvg from './components/IconSvg' // svg
import store from './store'
import CKEditor from '@ckeditor/ckeditor5-vue'
import EventBus from '@/until/eventBus'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(vuescroll, {
  // 全局默认配置
  ops: {
    vuescroll: {
      mode: 'native',
      sizeStrategy: 'percent',
      detectResize: false
    },
    scrollPanel: {
      speed: 500,
      easing: 'easeInQuint'
    },
    rail: {
      background: 'red',
      // opacity: 1,
      size: '6px',
      gutterOfSide: '5px'
    },
    bar: {
      background: '#D1D1D1',
      size: '6px'
    }
  },
  // 定义组件名称
  name: 'VueScroll'
})
Vue.component('icon-svg', IconSvg)
Vue.use(CKEditor)
// 全局事件
Vue.prototype.$eventBus = EventBus

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
