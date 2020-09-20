<template>
  <div class="app-container p-d-flex p-flex-column p-jc-center p-ai-center">
    <Card v-show="showCard" class="evaluator-card p-text-center">
      <h5 slot="title" class="h5">请您对我们的服务做出评价</h5>
      <template slot="content">
        <Rating v-model="score" />
      </template>
      <template slot="footer">
        <Button icon="pi pi-check" label="提交" class="p-button-info" @click="handleSubmit" />
        <Button icon="pi pi-times" label="取消" class="p-button-secondary" @click="handleCancel" />
      </template>
    </Card>
    <Welcome v-show="!showCard" />
    <!-- 评价器系统subpage
    <Button @click="sendMessage">通知主页</Button>
    <p>调用次数：{{ count }}</p>
    {{ message }} -->
  </div>
</template>

<script>
import Card from 'primevue/card'
import Rating from 'primevue/rating'
import Button from 'primevue/button'
import Welcome from 'components/Welcome'
import { sendRequest } from 'api'

export default {
  name: 'landing-page',
  components: { Card, Rating, Button, Welcome },
  data() {
    return {
      winID: null,
      count: 0,
      message: '',
      showCard: true,
      score: 0
    }
  },
  created() {
    this.initContent()
    this.appConnect()
  },
  methods: {
    appConnect() {
      sendRequest({
        url: '/queue/subscribe/',
        method: 'post',
        params: {
          counter_ip: '62.66.12.191'
        }
      }).then((res) => {
        if (res.ok) {
          this.score = 0
          this.showCard = true
        }
      })
    },
    async handleSubmit() {
      // this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 })
      // this.showCard = false
      this.$toast.add({ group: 'tip', severity: 'info', detail: '提交成功', life: null })
      console.log('提交', this.score)
      // const result = await sendRequest()
    },
    handleCancel() {
      console.log('取消')
    },
    open(link) {
      this.$electron.shell.openExternal(link)
    },
    initContent() {
      console.log('评价器系统', window.getCurrentWindow().id)
      window.ipcRenderer.send('connect', window.getCurrentWindow().id)
      window.ipcRenderer.on('connect', (event, id) => {
        this.winID = id
        console.log(this.winID)
      })
      window.ipcRenderer.on('notice', (event, arg) => {
        this.message = arg
      })
    },
    sendMessage() {
      this.count++
      // const { remote } = require('electron')
      window.ipcRenderer.sendTo(this.winID['index'], 'notice', `开启${this.getRandom(0, 10)}`)
    },
    getRandom(min, max) {
      return Math.random() * (max - min) + min
    }
  }
}
</script>

<style lang="scss">
  .app-container {
    // background: radial-gradient(
    //   ellipse at top left,
    //   rgba(255, 255, 255, 1) 40%,
    //   rgba(229, 229, 229, 0.9) 100%
    // );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;

    .evaluator-card {
      .h5 {
        margin: 0;
      }
    }

    .p-card {
      &.p-text-center {
        min-width: 320px;
      }
    }

    .p-rating-icon {
      font-size: 1.6rem;
      margin-left: 1rem;
    }

    .p-card-footer {
      .p-button {
        margin: 0 1rem;
      }
    }
  }
</style>
