import Vue from 'vue'
import router from '~modules/index/router'

import components from '~components/entry'

import '~assets/styles/index.scss'

Vue.config.productionTip = false

Vue.use(components)

new Vue({
  router,
  render: h => h('router-view'),
}).$mount('#app')
