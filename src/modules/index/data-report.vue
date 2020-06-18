<template>
  <div class="scroll-container report">
    <h1>{{ msg }}</h1>
    <h1 class="f-text">
      asdfljasl;dfjadsl;fjla;skjdfl;askjdfl;aksjdfl;kdasjfl;ksjadflkjasl;dfkjadsl;kfjals;kjdfkl;asjfdl;askf
    </h1>
    <div class="coupon">asdfasdfas</div>
    <p>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/contact">Contact</router-link>
    </p>
    <router-view></router-view>
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
@import '../../assets/styles/mixin.scss';
.report {
  height: 100%;
  padding-bottom: 500px;
}
.f-text {
  @include f-multiline-ellipsis(3);
}
</style>
