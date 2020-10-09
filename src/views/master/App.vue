<template>
  <div id="app">
    <AppStatus :active="appActive" />
    <Button icon="pi pi-print" label="应用升级" @click="showDialog('upgrade')" />
    <Button icon="pi pi-print" label="评价" @click="showDialog('evaluator')" />
    <Button icon="pi pi-print" label="签字板" @click="showDialog('signature-board')" />
    <Button icon="pi pi-print" label="打印" @click="showDialog('print')" />
    <!-- 全局tip提示语模版 -->
    <Toast class="tip-toast" group="tip" position="center" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppStatus from 'components/AppStatus'
import Toast from 'primevue/toast'
import Button from 'primevue/button'
import { noticeRequest } from 'utils/jsonpipe'

export default {
  name: 'App',
  components: { AppStatus, Button, Toast },
  data() {
    return {}
  },
  created() {
    this.initContent()
  },
  computed: {
    ...mapState(['baseURL', 'appActive'])
  },
  methods: {
    initContent() {
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
          message && this.messageTip({ type: 'error', message, duration: 0 })
          this.active = false
        }
      })
    },
    showDialog(winName) {
      window.ipcRenderer.send('open-dialog', winName)
    }
  }
}
</script>
