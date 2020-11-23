<template>
  <AppWrapper :active="appActive" position="right" class="app-wrapper print-wrapper">
    <!-- 结果 -->
    <Card>
      <div slot="title" class="p-d-flex p-jc-between p-ai-center p-pb-3 p-1px-b">
        <h5 class="p-m-0">违章信息查询</h5>
        <div class="p-input-icon-right">
          <InputText id="id_card" type="text" v-model="id_card" placeholder="身份证号" />
          <i class="pi pi-search" />
        </div>
      </div>
      <template slot="content">
        <div v-for="category of categories" :key="category.id" class="p-field-checkbox">
          <Checkbox 
            :id="`checkbox-category-${category.id}`" 
            name="category" 
            :value="category" 
            v-model="selectedItem" />
          <label 
            :for="`checkbox-category-${category.id}`" 
            class="p-d-flex p-jc-between"
            style="width: 100%">
            <div>
              {{ category.title }}
            </div>
            <div>
              {{ category.desc }}
            </div>
          </label>
        </div>
      </template>
      <div slot="footer" class="p-text-right p-pt-3 p-1px-t">
        <Button icon="pi pi-print" label="打印" class="p-m-0" @click="handlePrint"/>
      </div>
    </Card>
  </AppWrapper>
</template>

<script>
import { mapState } from 'vuex'
import AppWrapper from 'components/AppWrapper'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'

export default {
  components: { AppWrapper, InputText, Card, Checkbox, Button },
  data() {
    return {
      id_card: '411111111111111111',
      categories: [
        { id: '1', title: '违章1', desc: '1232131321312312', jdsbh: '12321423523462546' },
        { id: '2', title: '违章1', desc: '1232131321312312', jdsbh: '12321423523462546' }
      ],
      selectedItem: []
    }
  },
  computed: {
    ...mapState({
      appActive: state => state.appActive,
      routeName: state => state.route.name
    })
  },
  mounted() {
    window.ipcRenderer.once('visibility', (event, args) => {
      const params = {
        selectedItem: this.selectedItem,
        ...args
      }
      
      if (args && this.selectedItem.length) {
        this.$store.commit('SET_PRINT_INFO', params)
        if (this.path !== '/redirect/print/print-area') {
          // console.log('print-list', this.path, params)
          this.$router.push({ path: '/redirect/print/print-area' })
        }
        // return this.messageTip({ type: 'info', message: '请重新勾选要打印的信息' })
      }
    })
  },
  methods: {
    handlePrint() {
      if (!this.selectedItem.length) {
        return this.messageTip({ type: 'info', message: '请勾选要打印的信息' })
      }
      window.ipcRenderer.send('open-dialog', 'signature-board')
    }
  }
}

</script>
<style lang="scss">
@import '~styles/1px.scss';
.print-wrapper {
  height: 100%;
  background-color: $bg;
  .input-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .p-card {
    .p-card-content {
      padding: .5rem 0 0 0
    }
    .p-card-footer {
      padding: 0
    }
  }
}
</style>
