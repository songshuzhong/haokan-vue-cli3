<template>
  <div>
    <div class="sc-100vh">
      <uvc :id="1" />
    </div>
    <div class="sc-200vh">
      <uvc :id="2" />
    </div>
    <div class="sc-300vh" />
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to your prerender-spa-plugin vue-cli 3 demo app!',
    }
  },
}
</script>

<style lang="scss">
body {
  padding: 8px;
}
.report {
  height: 100%;
  padding-bottom: 500px;
}
.sc-100vh {
  position: relative;
  background-color: #00adb5;
  height: 120vh;
}
.sc-200vh {
  position: relative;
  height: 100vh;
  background-color: #67c23a;
}
.sc-300vh {
  position: relative;
  height: 100vh;
  background-color: #2472cd;
}
</style>
