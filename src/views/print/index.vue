<template>
  <div class="print-wrapper">
    <div class="input-box">
      <div class="p-field p-input-icon-left">
        <i class="pi pi-search" />
        <InputText id="id_card" type="text" v-model="id_card" placeholder="身份证号" disabled />
      </div>
    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext'

export default {
  name: '',
  components: { InputText },
  data() {
    return {
      id_card: ''
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建之前
  beforeCreate() { },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() { },
  // 生命周期 - 挂载之前
  beforeMount() { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
  // 生命周期 - 更新之前
  beforeUpdate() { },
  // 生命周期 - 更新之后
  updated() { },
  // 生命周期 - 销毁之前
  beforeDestroy() { },
  // 生命周期 - 销毁完成
  destroyed() { },
  // 如果页面有keep-alive缓存功能，这个函数会触发
  activated() { },
  methods: {}
}

</script>
<style lang="scss" scoped>
.print-wrapper {
  height: 100%;
  .input-box {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
