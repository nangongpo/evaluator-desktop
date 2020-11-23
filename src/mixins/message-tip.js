export default {
  install(Vue) {
    Vue.mixin({
      methods: {
        // 需在App.vue中创建提示窗模版
        // type: success、info、warn、error
        messageTip({ type = 'info', message, duration = 3000, callback }) {
          this.$toast.removeAllGroups()
          setTimeout(() => {
            callback && callback()
          }, duration)
          this.$toast.add({ group: 'tip', severity: type, detail: message, life: duration, closable: !duration })
        }
      }
    })
  }
}
