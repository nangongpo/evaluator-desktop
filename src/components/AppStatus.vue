<script>
import Button from 'primevue/button'
export default {
  name: 'AppStatus',
  functional: true,
  components: { Button },
  props: {
    icon: {
      type: String,
      default: 'pi pi-wifi'
    },
    active: Boolean
  },
  render(createElement, { props, data, children }) {
    const { active } = props
    return createElement('div', { class: 'app-status' }, [
      createElement('Button', 
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
  position: absolute;
  top: 10px;
  right: 10px;
  .p-button {
    .p-button-icon {
      font-size: 1.3rem
    }
  }
}
</style>
