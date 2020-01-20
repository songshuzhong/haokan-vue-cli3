import Vue from 'vue';
import Router from 'vue-router';
import DataReport from './data-report.vue';

Vue.use(Router);

const dataReport = new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      component: DataReport,
      children: [
        {
          path: '/view1',
          name: 'view1',
          component: () => import('./components/r-view1.vue')
        },
        {
          path: '/view2',
          name: 'view2',
          component: () => import('./components/r-view2.vue')
        }
      ]
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
