<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroller',
  props: {
    handleToScroll: {
      type: Function,
      default: function () {}
    },
    handleToTouchEnd: {
      type: Function,
      default: function () {}
    }
  },
  mounted () {
    // 确保dom结构全部渲染完成
    setTimeout(() => {
      this.scroller()
    }, 500)
  },
  methods: {
    scroller () {
      var scroll = new BScroll(this.$refs.wrapper, {
        tap: 'tap',
        probeType: 1
      })
      this.scroll = scroll

      scroll.on('scroll', (pos) => {
        this.handleToScroll(pos, scroll)
      })

      scroll.on('touchEnd', (pos) => {
        this.handleToTouchEnd(pos, scroll)
      })
    },
    toScrollTop (y) {
      if (this.scroll) {
        this.scroll.scrollTo(0, y)
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 100%;
}
</style>
