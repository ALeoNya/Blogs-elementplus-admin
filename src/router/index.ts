import { createRouter, createWebHistory } from 'vue-router'
import  menuList  from '@/router/menuList'

let routes1 = [
  {
    name: 'layout',
    path: '/',
    component: () => import('../layout/index.vue'),
    children:  [
      // 框内路由
      {
        name: 'edit',
        path: '/edit',
        component: () => import('../views/article/editArticle.vue')
      },
      { 
        name: '400',
        path: '/400',
        component: () => import('../views/error/400.vue')
      },
      {
        name: '401',
        path: '/401',
        component: () => import('../views/error/401.vue')
      },
      {
        name: '403',
        path: '/403',
        component: () => import('../views/error/403.vue')
      },
    ]
  },
  {
    name: 'test',
    path: '/test',
    component: () => import('../views/test/test.vue')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login.vue')
  },
]

const routes = menuList.concat(routes1)  // 两个路由文件拼接
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
