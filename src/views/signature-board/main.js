import Vue from 'vue'
import App from 'views/signature-board/index'
import router from '@/router'
import store from '@/store'

import 'styles/global.scss'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
// import 'primeflex/primeflex.css'
import ToastService from 'primevue/toastservice'
import MessageTip from '@/mixins/message-tip'
import Tooltip from 'primevue/tooltip'
import Button from 'primevue/button'

Vue.config.productionTip = false

// Vue.use(VueRouter)
Vue.use(ToastService)
Vue.use(MessageTip)
Vue.directive('tooltip', Tooltip)
Vue.component('Button', Button)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
