<template>
  <div class="wrapper">
    升级页
    <ProgressBar :value="percentage" />
    <span>正在检测版本，请稍后</span>
  </div>
</template>

<script>
import ProgressBar from 'primevue/progressbar'
export default {
  name: 'upgrade',
  components: { ProgressBar },
  data() {
    return {
      percentage: 0
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    initContent() {
      window.ipcRenderer.on('message', (e, message) => {
        console.log(message)
      })
      window.ipcRenderer.on('download-progress', (e, data) => {
        this.percentage = Number(data)
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.wrapper { display: block; }
</style>
