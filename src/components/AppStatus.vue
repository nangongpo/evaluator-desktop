<script>
import Button from 'primevue/button'
export default {
  name: 'AppStatus',
  functional: true,
  props: {
    icon: String,
    active: Boolean,
    position: String
  },
  render(createElement, { props, data, children }) {
    const { active, position } = props
    return createElement('div', {
      class: {
        'drag-content': true,
        'app-status': true,
        'left': position === 'left',
        'right': position === 'right'
      }
    }, [
      createElement(Button,
        { 
          class: {
            'p-button-rounded': true,
            'p-button-secondary': true,
            'no-focus': true,
            'p-button-info': active
          },
          props,
          directives: [
            {
              name: 'tooltip',
              value: active ? '在线' : '离线'
            }
          ],
          ...data
        },
        children)
    ])
  }
}
</script>

<style lang="scss">
.app-status {
  display: inline-block;
  &.left {
    position: absolute;
    top: .25rem;
    left: .25rem;
  }
  &.right {
    position: absolute;
    top: .25rem;
    right: .25rem;
  }
  .p-button {
    .p-button-icon {
      font-size: 1.3rem
    }
  }
}
</style>
