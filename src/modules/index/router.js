import Vue from 'vue'
import Router from 'vue-router'

import DataReport from './data-report.vue'
import About from './about.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: DataReport,
      children: [
        {
          path: '/contact',
          component: () =>
            import(/* webpackChunkName: "contact" */ './contact.vue'),
        },
      ],
    },
    {
      path: '/about',
      component: About,
    },
  ],
})
