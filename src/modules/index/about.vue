<template>
  <div>
    <sfc-async-cascader />
  </div>
  <!--
    <coupon />
    <img
      v-for="index in 40"
      :key="index"
      class="ft-empty"
      v-webp:src="require(`~assets/imgs/img-empty0.png`)"
    />-->
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      collector: {},
      days: {
        time_interval: 10,
        limit: 9,
      },
      age: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      test: [],
      link: '',
    }
  },
  mounted() {
    this.run()
  },
  methods: {
    run() {
      this.age.map(item => this.test.push(item))
    },
  },
}
</script>

<style lang="scss">
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
