import Vue from 'vue'
import notification from 'element-ui/lib/notification'
import router from '~modules/index/router'

import components from '~components/entry'
import { request } from '~utils/http'
import '~assets/styles/index.scss'

Vue.config.productionTip = false
Vue.prototype.$notice = notification
Vue.prototype.$http = request

Vue.use(components)

new Vue({
  router,
  render: h => h('router-view'),
}).$mount('#app')
