import { createRouter, createWebHistory } from 'vue-router'
import  menuList  from '@/router/menuList'
import { ref } from 'vue'


let routes1 = [
  {
    name: 'layout',
    path: '/layout',
    component: () => import('../layout/index.vue')
  },
  {
    name: 'test',
    path: '/test',
    component: () => import('../views/test/test.vue')
  },
  {
    name: 'test2',
    path: '/test2',
    component: () => import('../views/test/test2.vue')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login.vue')
  },
]

const routes = menuList.concat(routes1)
// console.log(routes)


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
