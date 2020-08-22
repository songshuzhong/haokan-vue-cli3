import MetaInfo from 'vue-meta-info'
import { Fragment } from 'vue-fragment'
import Loading from 'element-ui/lib/loading'

import Pie from '~components/fans/pie'
import Arch from '~components/fans/arch'
import Webp from '~components/webp'
import Coupon from '~components/fans/coupon'
// import SfcAsyncCascader from '~components/async-cascader'
import Exposure from '~components/fans/exposure'
import DirectLink from '~components/fans/direct-link'
// import AsyncComponent from '~components/async-component'
import SearchSelect from '~components/search-select'

import MisField from '~components/umis/field'
import MisSelect from '~components/umis/select'
import MisCheckbox from '~components/umis/checkbox'
import MisRadio from '~components/umis/radio'
import MisButton from '~components/umis/button'
import MisForm from '~components/umis/form'
import MisLayout from '~components/umis/layout'
import MisMain from '~components/umis/main'
import MisAside from '~components/umis/aside'
import MisTree from '~components/umis/tree'
import MisMenu from '~components/umis/menu'
import MisMenuItem from '~components/umis/menu-item'
import MisMenuItemGroup from '~components/umis/menu-item-group'
import MisHeader from '~components/umis/header'
import MisGrid from '~components/umis/grid'
import MisCards from '~components/umis/cards'
import MisAvatar from '~components/umis/avatar'
import MisHtml from '~components/umis/html'

import MisInput from 'element-ui/lib/input'
import MisContainer from 'element-ui/lib/container'
import MisFooter from 'element-ui/lib/footer'
import MisSwitch from 'element-ui/lib/switch'
import MisDatepicker from 'element-ui/lib/date-picker'

const components = {
  Fragment,
  Pie,
  Arch,
  Coupon,
  Exposure,
  DirectLink,
  SearchSelect,
  MisGrid,
  MisCards,
  MisAvatar,
  MisHtml,
  MisContainer,
  MisHeader,
  MisAside,
  MisMain,
  MisFooter,
  MisLayout,
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
  MisInput,
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
