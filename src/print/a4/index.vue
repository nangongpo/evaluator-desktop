<script>
export default {
  name: 'MyPrint',
  functional: true,
  props: {
    header: String,
    body: String,
    footer: String
  },
  render(createElement, { props }) {
    return createElement('div', { class: 'my-print' }, [
      createElement(
        'div', 
        { 
          class: 'my-print-header',
          domProps: {
            innerHTML: props.header
          }
        }
      ),
      createElement('div', { 
        class: 'my-print-body', 
        domProps: {
          innerHTML: props.body
        }
      }),
      createElement(
        'div', 
        { 
          class: 'my-print-footer',
          domProps: {
            innerHTML: props.footer
          }
        }
      )
    ])
  }
}
</script>

<style lang="scss" media="print,screen">
.my-print {
  width: 100%;
  height: 100%;
  padding: 10px;
  color: #000000;
  font-size: 12px;
  font-family: '宋体';
  box-sizing: border-box;
  p {
    margin: 0 0 5px 0;
    &:last-child {
      margin: 0;
    }
  }
  .single-content {
    padding: 10px;
    border: 1px solid #000000;
  }
  .single-bottom {
    padding-top: 10px;
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
    padding-right: 5px;
  }
  .bh {
    line-height: 44px;
  }
  .signature {
    display: flex;
    align-items: center;
    img {
      width: auto;
      height: 30px;
      margin-top: -20px;
      box-sizing: border-box;
    }
  }
  .p-0 {
    padding: 0;
  }
  .text-underline {
    border-bottom: 1px solid #000;
  }
  .text-center {
    text-align: center;
  }
  .text-indent {
    text-indent: 25px;
  }
  .text-interval {
    text-align: center;
    span {
      padding: 0 10px;
    }
  }
}
</style>
