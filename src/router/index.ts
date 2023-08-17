import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/layout',
      name: 'layout',
      component: () => import('../layout/index.vue')
    },
    {
      path: '/test',
      name: 'test',

      component: () => import('../views/test/test.vue')
    }
  ]
})

export default router
