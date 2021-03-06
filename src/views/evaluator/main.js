import Vue from 'vue'
import App from 'views/evaluator/index'
// import VueRouter from 'vue-router'
import store from '@/store'

import 'styles/global.scss'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice'
import MessageTip from '@/mixins/message-tip'
import Tooltip from 'primevue/tooltip'

Vue.config.productionTip = false

// Vue.use(VueRouter)
Vue.use(ToastService)
Vue.use(MessageTip)
Vue.directive('tooltip', Tooltip)

// const router = new VueRouter({
//   routes: [{
//     path: '/',
//     name: 'home',
//     component: () => import('views/evaluator/index')
//   }]
// })

new Vue({
  store,
  // router,
  render: h => h(App)
}).$mount('#app')
