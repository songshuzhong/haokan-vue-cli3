import Vue from 'vue'
import notification from 'element-ui/lib/notification'
import router from '~modules/index/router'

import components from '~components/entry'
import { request } from '~utils/http'
import { onExpressionEval } from '~utils/tools'

import '~assets/styles/index.scss'

Vue.prototype.$eventHub = new Vue()
Vue.config.productionTip = false
Vue.prototype.$notice = notification
Vue.prototype.$http = request
Vue.prototype.$onExpressionEval = onExpressionEval
Vue.use(components)

new Vue({
  router,
  render: h => h('router-view'),
}).$mount('#app')
