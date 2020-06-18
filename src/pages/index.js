import Vue from 'vue'
import router from '~modules/index/router'

import WebpPlugun from 'vue-webp-plugin'

Vue.config.productionTip = false

Vue.use(WebpPlugun)

new Vue({
  router,
  render: h => h('router-view'),
}).$mount('#app')
