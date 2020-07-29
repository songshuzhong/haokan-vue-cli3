<template>
  <div>
    <!--<coupon />
    <img
      v-for="index in 10"
      :key="index"
      class="ft-empty"
      v-webp:src="require(`~assets/imgs/img-empty${index - 1}.png`)"
    />-->
    <sfc-async-cascader />
    <router-link to="/contact"><span>contact</span></router-link>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {}
  },
}
</script>

<style lang="scss">
body {
  background-color: white;
}
.ft-extension-wrapper {
  margin: auto;
  text-align: center;
}
.ft-empty {
  width: 200px;
  height: 200px;
  margin: auto;
  background-size: cover;
}
.ft-coupon-details {
  color: #f00;
  color: #0f0;
  color: #00f;
}
circle {
  transition: r ease-in 0.25s, stroke-dasharray ease-in 0.25s;
}
</style>
