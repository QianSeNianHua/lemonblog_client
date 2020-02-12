import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import DocPanel from '@/views/DocPanel'
import Category from '@/views/Category'
import DocBrief from '@/views/DocBrief'
import OpenSource from '@/views/OpenSource'
import CategoryDocs from '@/views/CategoryDocs'
import Article from '@/views/Article'
import NotFoundHome from '@/views/NotFoundHome'

import Parent from '@/components/Test/Parent'

Vue.use(VueRouter)

const routes = [
  {
    // 首页
    path: '/p/:id',
    name: 'Home',
    component: Home
  },
  {
    path: '/u/:id',
    name: 'DocPanel',
    component: DocPanel,
    redirect: '/404',
    children: [
      {
        // 分类
        path: 'category',
        name: 'PanelCategory',
        component: Category
      },
      {
        path: 'category/categoryDocs',
        name: 'PanelCategoryDocs',
        component: CategoryDocs
      },
      {
        // 文档
        path: 'docBrief',
        name: 'PanelDocBrief',
        component: DocBrief
      },
      {
        path: 'docBrief/article',
        name: 'PanelArticle',
        component: Article
      },
      {
        path: 'openSource',
        name: 'PanelOpenSource',
        component: OpenSource
      }
    ]
  },
  {
    path: '/test',
    component: Parent
  },
  {
    path: '/404',
    name: 'NotFoundHome',
    component: NotFoundHome
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

router.onError(err => {
  console.log(err)
})

export default router
