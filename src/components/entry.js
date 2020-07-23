import MetaInfo from 'vue-meta-info'

import Loading from 'element-ui/lib/loading'

import Pie from '~components/pie'
import Arch from '~components/arch'
import Webp from '~components/webp'
import Uvc from '~components/uvc'
import Coupon from '~components/coupon'
import SfcAsyncCascader from '~components/asyncCascader'
import Exposure from '~components/exposure'
import DirectLink from '~components/directLink'

const components = {
  Uvc,
  Pie,
  Arch,
  Coupon,
  SfcAsyncCascader,
  Exposure,
  DirectLink,
}

const componentsName = Object.keys(components)

export default {
  install(Vue) {
    componentsName.forEach(i => Vue.component(i, components[i]))

    Vue.use(Loading)
    Vue.use(MetaInfo)
    Vue.use(Webp)
  },
}
