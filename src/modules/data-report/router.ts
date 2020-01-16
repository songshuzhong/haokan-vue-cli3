import Vue from 'vue';
import Router from 'vue-router';
// @ts-ignore
import DataReport from './data-report.vue';
Vue.use(Router);

const dataReport = new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      component: DataReport
    }
  ]
});

dataReport.beforeEach((to, from, next) => {
  if (to.name === 'Error' && Object.keys(to.params).length === 0) {
    next('/');
  } else {
    next();
  }
});

export default dataReport;
