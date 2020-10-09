<template>
  <div class="wrapper">
    打印
    <MyPrint :innerHTML="printContent"/>
  </div>
</template>

<script>
import MyPrint from '@/print/a4/index'
import { printContent } from '@/print/a4/cfjds'
export default {
  name: '',
  components: { MyPrint },
  data() {
    return {
      printContent: printContent()
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
.wrapper { display: block; }
</style>
