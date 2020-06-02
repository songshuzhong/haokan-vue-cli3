<template>
  <div>
    <h1>{{ msg }}</h1>
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
    };
  },
};
</script>
