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

const router = createRouter({
  history: createWebHistory(
    process.env.NODE_ENV === 'production' ? '/memory-number-training/' : './'
  ),
  routes
})

export default router
