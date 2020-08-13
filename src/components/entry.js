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
import MisButton from '~components/amis/button'
import MisForm from '~components/amis/form'
import MisLayout from '~components/amis/layout'
import MisMain from '~components/amis/main'
import MisAside from '~components/amis/aside'
import MisTree from '~components/amis/tree'
import MisMenu from '~components/amis/menu'
import MisMenuItem from '~components/amis/menu-item'
import MisMenuItemGroup from '~components/amis/menu-item-group'

import MisContainer from 'element-ui/lib/container'
import MisHeader from 'element-ui/lib/header'
import MisFooter from 'element-ui/lib/footer'

import MisSwitch from 'element-ui/lib/switch'
import MisDatepicker from 'element-ui/lib/date-picker'
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
  MisContainer,
  MisHeader,
  MisAside,
  MisMain,
  MisFooter,
  MisLayout,
  MisInput,
  MisField,
  MisSelect,
  MisCheckbox,
  MisRadio,
  MisSwitch,
  MisForm,
  MisButton,
  MisDatepicker,
  MisTree,
  MisMenu,
  MisMenuItem,
  MisMenuItemGroup,
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
