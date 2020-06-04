<template>
  <div class="ft-extension-wrapper">
    <pie
      :width="150"
      :r="60"
      :stroke-width="30"
      :dataSource="age"
    />
    <arch
      :value="1"
      :title="'人群定向'"
    />
  </div>
</template>

<script>
import Pie from '../../../components/pie';
import Arch from '../../../components/arch';

export default {
  name: 'About',
  components: {
    Pie,
    Arch,
  },
  data() {
    return {
      age: []
    }
  },
  mounted() {
    const { age } = window.$config;
    this.age = age;
  }
}
</script>

<style lang="scss">

  .ft-coupon-details {
    color: #f00;
    color: #0f0;
    color: #00f;
  }

  circle {
    transition: r ease-in .25s, stroke-dasharray ease-in .25s
  }
</style>
