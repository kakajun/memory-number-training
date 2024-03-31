import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'gussNumber',
    component: () => import('../views/gussNumber.vue')
  },
  {
    path: '/reverseOrder',
    name: 'reverseOrder',
    component: () => import('../views/reverseOrder.vue')
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
  },
  {
    path: '/pai',
    name: 'pai',
    component: () => import('../views/pai.vue')
  },
  {
    path: '/comparisonTable',
    name: 'comparisonTable',
    component: () => import('../views/comparisonTable.vue')
  }
]
const baseUrl = import.meta.env.BASE_URL
const router = createRouter({
  history: createWebHashHistory(baseUrl),
  routes
})

export default router
