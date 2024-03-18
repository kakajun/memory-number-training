import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'gussNumber',
    component: () => import('./views/gussNumber.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
