import {ActionTree, MutationTree} from 'vuex';

const couponList = {
  tabItems: [
    {
      name: 'all',
      text: '全场通用券'
    }, {
      name: 'exclusive',
      text: '专享优惠券'
    }
  ],                        // TODO: 默认优惠券tab显示
  activeTab: 'exclusive',        // TODO: 默认优惠券tab显示优惠券类别
  all: {                    // TODO: 通用优惠券
    isNoCoupon: null,     // TODO: 是否优惠券为空
    isRequestOk: null,    // TODO: 当前优惠券请求数据是否异常
    couponLength: 0,      // TODO: 当前类别优惠券总数
    usableCoupon: [],     // TODO: 当前类别所有可用优惠券
    unusableCoupon: [],    // TODO: 当前类别所有不可用优惠券
    isAll: false,          // TODO: 是否已经到底了
    currentPage: 1         // TODO: 当前已加载的页数
  },
  exclusive: {                    // TODO: 通用优惠券
    isNoCoupon: null,     // TODO: 是否优惠券为空
    isRequestOk: null,    // TODO: 当前优惠券请求数据是否异常
    couponLength: 0,      // TODO: 当前类别优惠券总数
    usableCoupon: [],     // TODO: 当前类别所有可用优惠券
    unusableCoupon: [],    // TODO: 当前类别所有不可用优惠券
    isAll: false,          // TODO: 是否已经到底了
    currentPage: 1         // TODO: 当前已加载的页数
  }
};

const actions: ActionTree<any, any> = {
  onTabChange(context, data) {
    context.commit('onTabChange', data);
  },
  getMoreCoupon(context, {activeTab, currentPage}) {
    fetch(`/members/api/coupon/list?scope=${activeTab}&status=2&size=10&page=${currentPage}`)
      .then(res => res.json())
      .then(({data}) => {
        data.activeTab = activeTab;
        context.commit('onMoreCoupon', data);
      })
      .catch(error => console.log(error.toString()));
  }
};

const mutations: MutationTree<any> = {
  onTabChange(state, data): void {
    state.activeTab = data.name;
  },
  onMoreCoupon(state, data): void {
    if (data.activeTab === 'all') {
      state.all.usableCoupon = [...state.all.usableCoupon, ...data.couponlist];
      state.all.currentPage += 1;
      state.all.isAll = state.all.usableCoupon.length === data.count - 1;
    } else if (data.activeTab === 'exclusive') {
      state.exclusive.usableCoupon = [...state.exclusive.usableCoupon, ...data.couponlist];
      state.exclusive.currentPage += 1;
      state.exclusive.isAll = state.exclusive.usableCoupon.length === data.count - 1;
    }
  }
};

export default {
  namespaced: true,
  state: couponList,
  actions,
  mutations
};
