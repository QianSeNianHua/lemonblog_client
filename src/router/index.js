import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import DocPanel from '@/views/DocPanel'
import Category from '@/views/Category'
import DocBrief from '@/views/DocBrief'
import OpenSource from '@/views/OpenSource'
import CategoryDocs from '@/views/CategoryDocs'
import Article from '@/views/Article'

import Parent from '@/components/Test/Parent'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/:id',
  //   name: 'HomeId',
  //   component: Home
  // },
  {
    path: '',
    name: 'DocPanel',
    component: DocPanel,
    children: [
      {
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
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
