import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/global.scss'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import ToastService from 'primevue/toastservice'

Vue.config.productionTip = false

Vue.use(ToastService)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
