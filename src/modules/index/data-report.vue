<template>
  <div class="hk-data-report">
    <header class="hk-data-report__header"></header>
    <nav
      class="hk-data-report__nav"
      :class="size ? 'open' : ''"
      @click="resize"
    />
    <aside class="hk-data-report__aside" :class="size ? 'open' : ''" />
    <main class="hk-data-report__main">
      <search-select :search-url="'http://dev.bendi.ad.weibo.com:3000/api/pagelist/1/1'" />
      <h1 class="hk-data-report__main__title" v-if="0">
        <router-link to="/about">障碍</router-link>
      </h1>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      size: false,
      msg: 'Welcome to your prerender-spa-plugin vue-cli 3 demo app!',
    }
  },
  methods: {
    resize() {
      this.size = !this.size
    },
  },
}
</script>

<style lang="scss">
body {
  padding: 8px;
  background-color: #f1f1f1;
}
.hk-data-report {
  position: relative;
  height: 200vh;
  width: 100%;
  display: flex;
}
.hk-data-report__nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 60px;
  height: 100vh;
  background-color: #2472cd;
  z-index: 10;
  transition: width 500ms ease-in-out;
  &.open {
    width: 200px;
  }
}
.hk-data-report__aside {
  position: relative;
  height: 100%;
  width: 60px;
  background-color: #af4d43;
  transition: width 500ms ease-in-out;
  &.open {
    width: 200px;
  }
}
.hk-data-report__main {
  position: relative;
  flex: 1;
  height: 100%;
  margin-right: 200px;
  margin-top: 50px;
  padding: 20px;
  background-color: white;
}
.hk-data-report__header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: #af4d43;
}
.hk-data-report__main__title {
  position: sticky;
  top: 0px;
  width: 960px;
  text-align: center;
  background-color: #67c23a;
}
</style>
