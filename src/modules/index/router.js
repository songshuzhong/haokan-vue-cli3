import Vue from 'vue'
import Router from 'vue-router'

import DataReport from './data-report.vue'
import About from './components/about.vue'

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
            import(
              /* webpackChunkName: "contact" */ './components/contact.vue'
            ),
        },
      ],
    },
    {
      path: '/about',
      component: About,
    },
  ],
})
