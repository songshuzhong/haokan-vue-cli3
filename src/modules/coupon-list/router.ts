import Vue from 'vue';
import Router from 'vue-router';
import CouponList from './coupon-list.vue';

Vue.use(Router);

const couponList = new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      component: CouponList
    }
  ]
});

couponList.beforeEach((to, from, next) => {
  if (to.name === 'Error' && Object.keys(to.params).length === 0) {
    next('/');
  } else {
    next();
  }
});

export default couponList;
