<template>
  <AppWrapper :active="appActive" class="master drag-wrapper">
    <!-- <Button icon="pi pi-print" label="应用升级" @click="showDialog('upgrade')" />
    <Button icon="pi pi-print" label="评价" @click="showDialog('evaluator')" />
    <Button icon="pi pi-print" label="签字板" @click="showDialog('signature-board')" /> -->
    <Button icon="pi pi-print" label="打印" class="p-button-rounded no-focus drag-content" @click="showDialog('print')" />
  </AppWrapper>
</template>

<script>
import { mapState } from 'vuex'
import AppWrapper from 'components/AppWrapper'
import Button from 'primevue/button'
export default {
  components: { AppWrapper, Button },
  computed: {
    ...mapState(['appActive'])
  },
  mounted() {
    this.initContent()
  },
  methods: {
    initContent() {
      
    },
    showDialog(winName) {
      window.ipcRenderer.send('open-dialog', winName)
    }
  }
}

</script>
<style lang="scss">
#app {
  border-radius: 30px;
}
.master {
  padding-left: .75rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: 30px;
  background-color: $bg;
  .app-status {
    padding-right: 10px
  }
}
</style>
