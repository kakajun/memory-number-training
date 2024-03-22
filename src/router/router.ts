import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'gussNumber',
    component: () => import('../views/gussNumber.vue')
  },
  {
    path: '/random',
    name: 'random',
    component: () => import('../views/randomNumber.vue')
  },
  {
    path: '/makeStory',
    name: 'makeStory',
    component: () => import('../views/makeStory.vue')
  }
]
const baseUrl = import.meta.env.BASE_URL
const router = createRouter({
  history: createWebHashHistory(baseUrl),
  routes
})

export default router
