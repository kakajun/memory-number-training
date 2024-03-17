// router.ts

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import selectImagesInOrder from './views/selectImagesInOrder.vue'
import About from './views/About.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'selectImagesInOrder',
    component: selectImagesInOrder
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
