<template>
  <div id="app">
    <router-view />
    <MyToast />
  </div>
</template>

<script>
import MyToast from 'components/MyToast'
export default {
  name: 'App',
  components: { MyToast }
}
</script>

<style lang="scss">
</style>
