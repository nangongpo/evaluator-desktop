<template>
  <div class="signature-board">
    <AppStatus :active="appActive"/>
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
        <Button icon="pi pi-check" label="提交" class="p-button-info" @click="handleSubmit" />
        <Button icon="pi pi-ban" label="清空" class="p-button-danger" @click="handleReset" />
        <Button icon="pi pi-times" label="取消" class="p-button-secondary" @click="handleSubmit('cancel')" />
      </template>
    </Card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppStatus from 'components/AppStatus'
import Card from 'primevue/card'
import vueEsign from 'vue-esign'
import Button from 'primevue/button'
// import { connect } from 'utils/connect'
import { sendRequest } from 'api'

export default {
  name: '',
  components: { AppStatus, Card, vueEsign, Button },
  data() {
    return {
      lineWidth: 2,
      lineColor: '#000000',
      bgColor: '#fff',
      resultImg: '',
      isCrop: false
    }
  },
  computed: {
    ...mapState({
      baseURL: state => state.baseURL,
      appActive: state => state.appActive,
      number_info: state => state.noticeInfo.number_info
    })
  },
  methods: {
    async handleSubmit() {
      const { number_info } = this
      if (!number_info) return this.messageTip({ type: 'info', message: '请重新发起签名板' })
      const signature = await this.$refs.esign.generate().catch(() => {})
      if (!signature) return this.messageTip({ type: 'info', message: '请签字' })
      const result = await sendRequest({
        url: `${this.baseURL}/queue/signature`,
        method: 'post',
        params: { number_info, signature }
      })
      if (result.ok) {
        this.messageTip({ type: 'info', message: '提交成功' })
      }
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
  .dialog-card {
    width: 440px;
  }
  .signature-area {
    height: 160px;
    border: 1px solid black
  }
}
</style>
