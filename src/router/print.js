import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('views/print/index')
  },
  {
    path: '/print',
    name: 'print',
    component: () => import('views/print/print')
  }
]

const router = new VueRouter({
  routes
})

export default router
