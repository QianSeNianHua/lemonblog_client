import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import DocPanel from '@/views/DocPanel'
import Category from '@/views/Category'
import DocBrief from '@/views/DocBrief'
import OpenSource from '@/views/OpenSource'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '',
    name: 'DocPanel',
    component: DocPanel,
    redirect: '/category',
    children: [
      {
        path: 'category',
        name: 'PanelCategory',
        component: Category
      },
      {
        path: 'docBrief',
        name: 'PanelDocBrief',
        component: DocBrief
      },
      {
        path: 'openSource',
        name: 'PanelOpenSource',
        component: OpenSource
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
