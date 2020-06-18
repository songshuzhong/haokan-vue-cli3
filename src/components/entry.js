import MetaInfo from 'vue-meta-info';

const components = {};

const componentsName = Object.keys(components);

const component = {
  install(Vue) {
    componentsName.forEach((i) => {
      Vue.component(i, components[i]);
    });
    Vue.use(MetaInfo);
  },
};

export default component;
