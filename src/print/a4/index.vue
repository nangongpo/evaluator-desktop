<script>
export default {
  name: 'MyPrint',
  functional: true,
  props: {
    innerHTML: String
  },
  render(createElement, { props }) {
    return createElement('div', { 
      class: 'print-area', 
      domProps: {
        innerHTML: props.innerHTML
      }
    })
  }
}
</script>

<style lang="scss" media="print,screen">
.print-area {
  margin: 0 5px;
  color: #000000;
  font-size: 14px;
  background-color: #fff;
  .single-content {
    padding: 10px;
    border: 1px solid #000000;
  }
  .title {
    font-size: 16px;
    text-align: center;
    font-weight: 500;
  }
  .subtitle {
    font-size: 18px;
    text-align: center;
    font-weight: 600;
  }
  .each-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .each-line > p:first-child {
    padding-right: 10px;
  }
  u {
    font-size: 13px;
  }
  .bh {
    line-height: 64px;
  }
  .keep {
    word-break: keep-all;
  }
  .high-one {
    padding-top: 10px;
    min-height: 120px;
  }
  .high-two {
    padding-top: 20px;
    min-height: 120px;
  }
  .mandatory {
    min-width: 184px;
  }
  .position {
    text-align: center;
  }
  .interval {
    width: 100%;
    text-align: center;
  }
  .interval span {
    padding: 0 10px;
  }
}
</style>
