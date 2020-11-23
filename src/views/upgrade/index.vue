<template>
  <div class="wrapper">
    升级页
    <ProgressBar :value="percentage" />
    <span>{{message}}</span>
  </div>
</template>

<script>
import ProgressBar from 'primevue/progressbar'
export default {
  name: 'upgrade',
  components: { ProgressBar },
  data() {
    return {
      message: '正在检查更新...',
      percentage: 0
    }
  },
  mounted() {
    this.initContent()
  },
  methods: {
    initContent() {
      window.ipcRenderer.on('message', (e, message) => {
        console.log('message', message)
        this.message = message
      })
      window.ipcRenderer.on('download-progress', (e, data) => {
        this.percentage = Number(data)
      })
      window.ipcRenderer.on('isUpdateNow', () => {
        // 是否现在更新
        console.log('下载完成,是否退出完成更新')
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.wrapper { display: block; }
</style>
