<template>
  <div id="content">
    <Header title="我的喵喵"></Header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tabbar></tabbar>
  </div>
</template>

<script>
import Header from '@/components/Header'
import tabbar from '@/components/Tabbar'

export default {
  data () {
    return {}
  },
  components: {
    Header,
    tabbar
  }
}
</script>

<style>

</style>
