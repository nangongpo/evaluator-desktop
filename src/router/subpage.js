import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'evaluator',
    component: () => import('views/subpages/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
