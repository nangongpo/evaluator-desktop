import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/redirect/:path(.*)',
    component: () => import('views/redirect')
  },
  {
    path: '/upgrade',
    name: 'upgrade',
    component: () => import('views/upgrade/index')
  },
  {
    path: '/master',
    name: 'master',
    component: () => import('views/master/index')
  },
  {
    path: '/evaluator',
    name: 'evaluator',
    component: () => import('views/evaluator/index')
  },
  {
    path: '/print',
    name: 'print',
    component: () => import('views/print/index'),
    children: [
      {
        path: 'print-list',
        name: 'print-list',
        component: () => import('views/print/print-list')
      },
      {
        path: 'print-area',
        name: 'print-area',
        component: () => import('views/print/print-area')
      }
    ]
  },
  {
    path: '/signature-board',
    name: 'signature-board',
    component: () => import('views/signature-board/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
