import Vue from 'vue'
import Router from 'vue-router'
import Loading from 'element-ui/lib/loading'

import Home from './home.vue'
import About from './about.vue'

Vue.use(Router)

let routerMask
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/contact',
      component: () =>
        import(/* webpackChunkName: "contact" */ './contact.vue'),
    },
    {
      path: '/about',
      component: About,
      meta: {
        title: 'About',
      },
    },
    {
      path: '/upload',
      component: () =>
        import(
          /* webpackChunkName: "upload" */ '../../components/big-upload/index'
        ),
      mete: {
        title: 'upload',
      },
    },
    {
      path: '/umis',
      component: () =>
        import(/* webpackChunkName: "mis" */ '~modules/index/mis'),
      mete: {
        title: 'mis',
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  routerMask = Loading.service({
    fullscreen: true,
    customClass: 'hk-router-loading',
  })
  next()
})

router.afterEach((router, from) => {
  if (routerMask && typeof routerMask.close === 'function') {
    routerMask.close()
  }
  if (router.meta && router.meta.title) {
    document.title = router.meta.title
  } else {
    document.title = 'Demo'
  }
})
export default router
