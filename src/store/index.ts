import Vue from 'vue';
import Vuex from 'vuex';
import couponList from './modules/coupon-list';

Vue.use(Vuex);

export default new Vuex.Store({
    // @ts-ignore
    modules: {
        couponList
    }
});
