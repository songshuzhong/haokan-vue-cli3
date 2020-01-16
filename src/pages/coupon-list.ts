import Vue from 'vue';
import store from '../store';
import couponList from '../modules/coupon-list/router';
import component from '../components/entry';

Vue.use(component);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router: couponList,
  render: h => h('router-view')
});
