<script>
import AppStatus from 'components/AppStatus'
import Toast from 'primevue/toast'

export default {
  name: 'AppWrapper',
  functional: true,
  props: {
    active: Boolean,
    icon: {
      type: String,
      default: 'pi pi-wifi'
    },
    position: String
  },
  render(createElement, context) {
    const { props } = context
    const { position } = props
    return createElement('div', context.data, [
      createElement(AppStatus, { props }),
      createElement(
        'div',
        { 
          class: {
            'drag-content': true,
            'app-status-position': !position,
            'app-status-left': position === 'right',
            'app-status-right': position === 'left'
          }
        },
        context.children
      ),
      createElement(
        Toast,
        { class: 'tip-toast', attrs: { group: 'tip', position: 'center' }}
      )
    ])
  }
}
</script>

<style lang="scss">
.app-wrapper {
  padding: 1.5rem;
}
.app-status-position {
  display: inline-block;
}
.app-status-right {
  margin-left: 50px
}
.p-toast {
  &.tip-toast {
    width: auto;
    min-width: 10rem;
    opacity: 1;
    .p-toast-message-content {
      display: flex;
      align-items: center;
      padding: 10px;
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

