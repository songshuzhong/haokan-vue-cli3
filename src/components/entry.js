import MetaInfo from 'vue-meta-info'
import { Plugin } from 'vue-fragment'
import Loading from 'element-ui/lib/loading'

import Pie from '~components/pie'
import Arch from '~components/arch'
import Webp from '~components/webp'
import Coupon from '~components/coupon'
import SfcAsyncCascader from '~components/async-cascader'
import Exposure from '~components/exposure'
import DirectLink from '~components/direct-link'
import AsyncComponent from '~components/async-component'
import SearchSelect from '~components/search-select'

import MisField from '~components/amis/field'
import MisSelect from '~components/amis/select'
import MisCheckbox from '~components/amis/checkbox'
import MisRadio from '~components/amis/radio'

import MisSwitch from 'element-ui/lib/switch'

import MisInput from 'element-ui/lib/input'

const components = {
  Pie,
  Arch,
  Coupon,
  SfcAsyncCascader,
  Exposure,
  DirectLink,
  AsyncComponent,
  SearchSelect,
  MisInput,
  MisField,
  MisSelect,
  MisCheckbox,
  MisRadio,
  MisSwitch,
}

const componentsName = Object.keys(components)

export default {
  install(Vue) {
    componentsName.forEach(i => Vue.component(i, components[i]))

    Vue.use(Loading)
    Vue.use(Plugin)
    Vue.use(MetaInfo)
    Vue.use(Webp)
  },
}
