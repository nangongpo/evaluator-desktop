<template>
  <div class="evaluator">
    <AppStatus :active="appActive"/>
    <Card class="dialog-card">
      <h4 slot="title" class="dialog-card-title">请您对我们的服务做出评价</h4>
      <template slot="content">
        <Rating :value="score" :stars="4" :cancel="false" @input="updateScore" />
        <br/>
        <strong>{{ describe }}</strong>
      </template>
      <template slot="footer">
        <Button icon="pi pi-check" label="提交" class="p-button-info" @click="handleSubmit('submit')" />
        <Button icon="pi pi-times" label="取消" class="p-button-secondary" @click="handleSubmit('cancel')" />
      </template>
    </Card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppStatus from 'components/AppStatus'
import Card from 'primevue/card'
import Rating from 'primevue/rating'
import Button from 'primevue/button'
// import { connect } from 'utils/connect'
import { sendRequest } from 'api'

const describeMap = ['不满意', '一般', '满意', '非常满意']
      
export default {
  name: 'evaluator',
  components: { AppStatus, Card, Rating, Button },
  data() {
    return {
      timer: null,
      score: describeMap.length,
      describe: describeMap[describeMap.length - 1]
    }
  },
  computed: {
    ...mapState({
      baseURL: state => state.baseURL,
      appActive: state => state.appActive,
      number_info: state => state.noticeInfo.number_info
    })
  },
  mounted() {
    this.restore()
  },
  methods: {
    async handleSubmit(action) {
      if (action === 'submit' && !this.number_info) return this.messageTip({ type: 'info', message: '请重新发起评价' })
      const levelMap = describeMap.reserve()
      const result = await sendRequest({
        url: `${this.baseURL}/queue/evaluate/`,
        method: 'post',
        params: {
          number_info: this.number_info,
          type: action === 'cancel' ? '2' : '1', // 1--人工评价，2--默认评价
          level: String(levelMap.indexOf(this.describe) + 1)
        }
      })
      if (result.ok) {
        action === 'submit' && this.messageTip({ type: 'info', message: '提交成功' })
      }
    },
    restore() {
      this.$toast.removeAllGroups()
      // 20s未操作，回到首页
      this.setTimer(20)
    },
    updateScore(score) {
      this.describe = score > 0 ? describeMap[score - 1] : describeMap[0]
      this.score = score
    },
    setTimer(seconds) {
      const clearMethod = () => {
        this.timer && clearTimeout(this.timer)
        this.timer = null
      }
      this.timer && clearMethod()
      this.timer = setTimeout(() => {
        if (this.score !== 3) {
          clearMethod()
        } else {
          this.handleSubmit('cancel')
        }
      }, seconds * 1000)
      this.$once('hook:beforeDestory', () => {
        clearMethod()
      })
    }
  }
}
</script>

<style lang="scss">
.evaluator {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 16px;
  .dialog-card {
    width: 360px;
  }
}
</style>

<style lang="scss">
.evaluator {
  .p-rating {
    .p-rating-icon {
      font-size: 2rem;
      margin-left: 1rem;
    }
  }
}
</style>
