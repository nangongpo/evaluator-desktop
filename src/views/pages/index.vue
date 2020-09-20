<template>
  <div class="app-container">
    主页index
    <Button @click="sendMessage">通知评价器</Button>
    <p>调用次数：{{ count }}</p>
    {{ message }}
    <!-- <router-view/> -->
  </div>
</template>

<script>
import Button from 'primevue/button'

export default {
  name: 'home',
  components: { Button },
  data() {
    return {
      winID: null,
      count: 0,
      message: ''
    }
  },
  mounted() {
    this.initContent()
  },
  methods: {
    initContent() {
      console.log('主页', window.getCurrentWindow().id)
      window.ipcRenderer.send('connect', window.getCurrentWindow().id)
      window.ipcRenderer.on('connect', (event, id) => {
        this.winID = id
      })
      window.ipcRenderer.on('notice', (event, arg) => {
        this.message = arg
      })
    },
    sendMessage() {
      this.count++
      window.ipcRenderer.sendTo(this.winID['subpage'], 'notice', `通知评价器${this.getRandom(0, 10)}`)
    },
    getRandom(min, max) {
      return Math.random() * (max - min) + min
    }
  }
}
</script>

<style lang="scss">
  // #app {
  //   font-family: Avenir, Helvetica, Arial, sans-serif;
  //   -webkit-font-smoothing: antialiased;
  //   -moz-osx-font-smoothing: grayscale;
  //   text-align: center;
  //   color: #2c3e50;
  // }
</style>
