<template>
  <div class="ft-extension-wrapper">
    <pie :width="150" :r="60" :stroke-width="30" :dataSource="age" />
    <arch :value="1" :title="'人群定向'" />
    <img v-webp="empty" />
    <img v-webp="d" />
    <img v-webp="c" />
    <router-link to="/">Home</router-link>
  </div>
</template>

<script>
import Pie from '~components/pie'
import Arch from '~components/arch'
import empty from '~assets/imgs/img-empty.png'
import d from '~assets/imgs/0.gif'
import c from '~assets/imgs/cherry.jpg'

export default {
  name: 'About',
  components: {
    Pie,
    Arch,
  },
  data() {
    return {
      age: [],
      empty,
      d,
      c,
    }
  },
  mounted() {
    const { age } = window.$config
    this.age = age
  },
}
</script>

<style lang="scss">
.ft-coupon-details {
  color: #f00;
  color: #0f0;
  color: #00f;
}

circle {
  transition: r ease-in 0.25s, stroke-dasharray ease-in 0.25s;
}
</style>
