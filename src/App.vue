<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { noticeRequest } from 'utils/jsonpipe'

export default {
  name: 'App',
  components: { },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      baseURL: state => state.baseURL,
      path: state => state.route.path
    })
  },
  created() {
    this.initContent()
  },
  methods: {
    initContent() {
      window.ipcRenderer.on('app-show', (event, winName) => {
        window.name = winName
        const routes = this.$router.options.routes
        const curRoute = routes.filter(v => v.name === winName)
        let path = `/${winName}`
        if (curRoute.length && curRoute[0].children && curRoute[0].children.length) {
          path = `/${winName}/${curRoute[0].children[0].name}`
        }
        this.$router.push({ path: `/redirect${path}` })
      })
      if (!__ipconfig.counter_ip) return this.messageTip({ type: 'info', message: '请配置IP地址', duration: 0 })
      const data = new FormData()
      const url = `${this.baseURL}/queue/subscribe/`
      data.append('counter_ip', __ipconfig.counter_ip)
      noticeRequest(url, {
        data,
        success: (result) => {
          const orderType = {
            // 发起评价
            startEvalution: (data) => {
              if (data) {
                this.$store.commit('SET_NOTICE_INFO', { number_info: data })
                window.ipcRenderer.on('open-dialog', 'evaluator')
                // this.$router.push({ path: '/redirect/evaluator' })
              }
            },
            // 暂停服务
            servicePaused: () => {
              this.$router.replace({ name: 'home', query: { message: '暂停服务' }})
            },
            // 恢复服务
            restoreService: () => {
              this.$router.replace({ name: 'home' })
            }
          }
          this.$store.commit('SET_APP_ACTIVE', result.ok)
          if (result.ok) {
            return orderType[result.type] && orderType[result.type](result.data)
          }
          result.message && this.messageTip({ type: 'error', message: result.message, duration: 0 })
        },
        error: (message) => {
          message && this.messageTip({ type: 'error', message, duration: 2000 })
          this.active = false
        }
      })
    }
  }
}
</script>
