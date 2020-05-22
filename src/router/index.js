import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login'
import Register from '@/views/Register'
import Home from '@/views/Home'
import DocPanel from '@/views/DocPanel'
import Category from '@/views/Category'
import DocBrief from '@/views/DocBrief'
import OpenSource from '@/views/OpenSource'
import CategoryDocs from '@/views/CategoryDocs'
import Article from '@/views/Article'
import NotFound from '@/views/NotFound'
import UserInfo from '@/views/UserInfo'
import ArticleEditor from '@/views/ArticleEditor'
import Demo from '@/components/Test/Demo'

Vue.use(VueRouter)

const routes = [
  {
    // 登录
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    // 博客首页
    path: '/',
    redirect: '/login'
  },
  {
    // 注册
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    // 个人首页
    path: '/p/:userId',
    name: 'Home',
    component: Home
  },
  {
    // 导航栏
    path: '/u/:userId',
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
        // 分类文件夹下的文章列表
        path: 'category/:folderId',
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
        // 文章
        path: 'article/:articleId',
        name: 'PanelArticle',
        component: Article
      },
      {
        // 我的开源
        path: 'openSource',
        name: 'PanelOpenSource',
        component: OpenSource
      }
    ]
  },
  {
    // 个人中心
    path: '/info/:userId',
    name: 'UserInfo',
    component: UserInfo
  },
  {
    // 文章编辑器
    path: '/editor/:userId/:folderId',
    name: 'ArticleEditor',
    component: ArticleEditor
  },
  {
    path: '/test',
    component: Demo
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
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
