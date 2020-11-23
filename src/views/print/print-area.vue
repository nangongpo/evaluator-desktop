<template>
  <div class="print-area">
    <Button v-show="showButton" label="打印" icon="pi pi-print" @click="onPrint"></Button>
    <div v-for="(item, index) in printContent" :key="index" class="p-d-flex">
      <template v-for="print in item">
        <MyPrint
          :key="print.id"
          :body="print.body"
          :footer="print.footer" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MyPrint from '@/print/a4/index'
import Button from 'primevue/button'
import JsBarcode from 'jsbarcode2'
import { printContent } from '@/print/a4/cfjds'

export default {
  components: { MyPrint, Button },
  data() {
    return {
      showButton: true,
      printList: null,
      scoreList: [
        '第一份 由被处罚人交银行',
        '第二份 送达被处罚人',
        '第三份 送达被处罚人'
      ],
      printContent: null
    }
  },
  computed: {
    ...mapState({
      routeName: state => state.route.name,
      printInfo: state => state.printInfo
    })
  },
  mounted() {
    this.initContent()
  },
  methods: {
    initContent() {
      const { signature, selectedItem } = this.printInfo
      if (signature && selectedItem) {
        window.ipcRenderer.send('get-printers', 'print')
        window.ipcRenderer.once('printers', (event, printList) => {
          if (!printList.length) {
            return this.messageTip({ type: 'info', message: '请检查打印机是否正常链接' })
          }
        })
        this.printContent = selectedItem.map(item => {
          const barcode = this.textToBase64Barcode(item.jdsbh)
          return this.scoreList.map(v => {
            return {
              body: printContent({ barcode, signature, ...item }),
              footer: v
            }
          })
        })
      }
    },
    onPrint() {
      this.showButton = false
      const webContents = window.getCurrentWebContents()
      const options = { 
        silent: true, 
        deviceName: '',
        margins: {
          marginType: 'custom',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        },
        printBackground: false,
        landscape: true,
        pageSize: 'A4',
        duplexMode: 'simplex',
        collate: true
      }
      webContents.print(options, (success, errorType) => {
        if (!success) console.log(errorType)
        this.showButton = true
      })
    },
    textToBase64Barcode(text) {
      const canvas = document.createElement('canvas')
      JsBarcode(canvas, text, {
        format: 'CODE128', // 条形码的格式
        lineColor: '#000000', // 线条颜色
        width: 1, // 线宽
        height: 25, // 条码高度
        displayValue: true, // 是否显示文字信息
        fontSize: 13
      })
      return canvas.toDataURL('image/png')
    }
  }
}

</script>
<style lang="scss">
.print-area {
  height: 100%;
  background-color: #fff;
  .p-button {
    position: fixed;
    right: 0;
  }
  .p-d-flex {
    height: 100%;
    padding: 20px;
    page-break-before: always;
    margin: 0 auto;
  }
}
</style>
