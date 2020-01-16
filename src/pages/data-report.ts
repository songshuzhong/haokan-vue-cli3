import Vue from 'vue';
import dataReport from '../modules/data-report/router';
import store from '../store';
import component from '../components/entry';

Vue.use(component);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router: dataReport,
  render: h => h('router-view')
});
