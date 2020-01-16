import MetaInfo from 'vue-meta-info';
import Navigator from './navigator.vue';
import CouponCard from './coupon-card.vue';
import Loading from './loading.vue';
import Empty from './empty.vue';

const components: any = {
  Navigator,
  CouponCard,
  Loading,
  Empty
};
const componentsName: string[] = Object.keys(components);

const component = {
  install(Vue: any) {
    componentsName.forEach((i) => {
      Vue.component(i, components[i]);
    });
    Vue.use(MetaInfo);
  },
};

export default component;
