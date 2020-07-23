<template>
  <div class="sc-uvc" ref="uvc" :style="{ top: `${top}px` }" />
</template>

<script>
export default {
  name: 'Uvc',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      top: 200,
      bottom: 0,
      offsetTop: 0,
      hasBeenFixed: false,
      isDown: false,
    }
  },
  mounted() {
    this.node = this.$refs.uvc
    this.parentNode = this.$refs.uvc.parentNode
    this.scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop

    window.addEventListener('scroll', event => this.onScrolling(event))
  },
  methods: {
    onScrolling(event) {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      const pRect = this.parentNode.getBoundingClientRect()
      const pBottom = pRect.bottom
      const pHeight = pRect.height
      const cRect = this.node.getBoundingClientRect()
      const cBottom = cRect.bottom
      const cTop = cRect.top
      const pTop = pRect.top
      const cHeight = cRect.height
      this.isDown = this.scrollTop - scrollTop > 0
      this.scrollTop = scrollTop

      if (!this.isDown) {
        if (cTop < 80 && !this.hasBeenFixed) {
          this.top = 80
          this.hasBeenFixed = true
          this.node.classList.add('fixed')
        }
        if (pBottom - 5 <= cBottom) {
          this.top = pHeight - cHeight
          this.hasBeenFixed = false
          this.node.classList.remove('fixed')
        }
      } else {
        if (pBottom > cHeight + 80 && pTop < 0) {
          this.top = 80
          this.hasBeenFixed = true
          this.node.classList.add('fixed')
        } else {
          this.hasBeenFixed = false
          this.node.classList.remove('fixed')
        }
      }
    },
  },
}
</script>
<style lang="scss">
.sc-uvc {
  position: relative;
  overflow: hidden;
  width: 80px;
  padding: 10px;
  height: 280px;
  border: 1px solid grey;
  background-color: #fff;
  font-size: 12px;
  z-index: 2020;
  &.fixed {
    position: fixed;
    top: 50px;
  }
}
</style>
