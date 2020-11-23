<template>
  <AppWrapper :active="appActive" position="right" class="app-wrapper signature-board">
    <Card class="dialog-card">
      <h4 slot="title" class="dialog-card-title">签名板</h4>
      <div class="signature-area" slot="content">
        <vue-esign 
          ref="esign" 
          :width="440" 
          :height="160"
          :isCrop="isCrop" 
          :lineWidth="lineWidth" 
          :lineColor="lineColor" 
          :bgColor.sync="bgColor" />
      </div>
      <template slot="footer">
        <Button icon="pi pi-check" label="保存" class="p-button-info" @click="handleSubmit" />
        <Button icon="pi pi-ban" label="清空" class="p-button-danger" @click="handleReset" />
      </template>
    </Card>
  </AppWrapper>
</template>

<script>
import { mapState } from 'vuex'
import Card from 'primevue/card'
import vueEsign from 'vue-esign'
import Button from 'primevue/button'
import AppWrapper from 'components/AppWrapper'

export default {
  components: { AppWrapper, Card, vueEsign, Button },
  data() {
    return {
      lineWidth: 4,
      lineColor: '#000000',
      bgColor: '#fff',
      resultImg: '',
      isCrop: false
    }
  },
  computed: {
    ...mapState(['appActive'])
  },
  methods: {
    async handleSubmit() {
      const signature = await this.$refs.esign.generate().catch(() => {})
      if (!signature) return this.messageTip({ type: 'info', message: '请签字' })
      window.ipcRenderer.send('close-dialog', 'signature-board')
      setTimeout(() => {
        window.ipcRenderer.send('open-dialog', 'print', { signature })
        this.handleReset()
      }, 300)
    },
    handleReset() {
      this.$refs.esign.reset()
    }
  }
}

</script>
<style lang="scss" scoped>
.signature-board {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: $bg;
  .dialog-card {
    width: 440px;
  }
  .signature-area {
    height: 160px;
    border: 1px solid black
  }
}
</style>
