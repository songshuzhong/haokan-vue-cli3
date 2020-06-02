import Vue from 'vue';
import Router from 'vue-router';

import DataReport from './data-report.vue';
import About from './components/about.vue';
import Contact from './components/contact.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: DataReport,
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/contact',
      component: Contact
    }
  ]
});
