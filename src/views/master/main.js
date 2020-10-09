import Vue from 'vue'
import App from 'views/master/App.vue'
import store from '@/store'

import 'styles/global.scss'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
// import 'primeflex/primeflex.css'

import ToastService from 'primevue/toastservice'
import MessageTip from '@/mixins/message-tip'
import Tooltip from 'primevue/tooltip'

Vue.config.productionTip = false

Vue.use(ToastService)
Vue.use(MessageTip)
Vue.directive('tooltip', Tooltip)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
