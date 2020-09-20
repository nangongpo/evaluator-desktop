<script>
import Toast from 'primevue/toast'

export default {
  name: 'MyToast',
  functional: true,
  components: { Toast },
  props: {
    group: {
      type: String,
      default: 'tip'
    },
    position: {
      type: String,
      default: 'center'
    }
  },
  render(createElement, { props, data }) {
    return createElement('Toast', { class: 'my-toast', props, ...data })
  }
}
</script>

<style lang="scss">
.p-toast {
  &.my-toast {
    opacity: 1;
    .p-toast-message-content {
      display: flex;
      align-items: center;
    }
    .p-toast-message {
      .p-toast-message-content {
        .p-toast-detail {
          margin: 0;
        }
      }
    }
  }
}
</style>
