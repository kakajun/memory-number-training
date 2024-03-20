import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'gussNumber',
    component: () => import('./views/gussNumber.vue')
  },
  {
    path: '/random',
    name: 'random',
    component: () => import('./views/randomNumber.vue')
  }
]
const baseUrl = import.meta.env.BASE_URL
const router = createRouter({
  history: createWebHistory(baseUrl),
  routes
})

export default router
