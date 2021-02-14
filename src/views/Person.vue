<template>
  <div id="main">
    <Header title="我的喵喵"></Header>
    <div id="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Tabbar from '@/components/Tabbar'

export default {
  data () {
    return {}
  },
  components: {
    Header,
    Tabbar
  }
}
</script>

<style>

</style>
