<template>
  <div class="ft-coupon-mobile-wrapper">
    <navigator
        :isFixed="true"
        :items="couponList.tabItems"
        @toggle-tab="handleTabChange"
    />
    <coupon-card
        v-show="couponList.activeTab === 'all'"
        :cards="couponList.all.usableCoupon"
    />
    <coupon-card
        v-show="couponList.activeTab === 'exclusive'"
        :cards="couponList.exclusive.usableCoupon"
    />
    <loading
        :hasMore="hasMore"
    />
    <empty
        :isEmpty="isEmpty"
    />
  </div>
</template>
<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import {State, namespace} from 'vuex-class';

  import '../../assets/styles/reset.scss';

  const couponList = namespace('couponList');

  @Component({
    // @ts-ignore
    metaInfo() {
      return {
        title: '我的优惠券',
        meta: [
          {hid: 'description', name: 'description', content: 'My custom description'},
        ]
      };
    }
  })
  export default class CouponList extends Vue {
    @State('couponList') private couponList: any;
    @couponList.Action('onTabChange') private onTabChange!: any;
    @couponList.Action('getMoreCoupon') private getMoreCoupon!: any;

    private mounted() {
      this.onScrolling();
      window.addEventListener('scroll', this.debounce(this.onScrolling));
    }

    private onScrolling(): void {
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const isBottom = (scrollTop + clientHeight >= scrollHeight - 50);

      if (isBottom) {
        this.onLoadingMoreCoupon();
      }
    }

    private onLoadingMoreCoupon(): void {
      const activeTab = this.couponList.activeTab;
      const currentPage = this.couponList[activeTab].currentPage;
      this.getMoreCoupon({activeTab, currentPage});
    }

    private debounce(fun: any, wait: number = 500) {
      let timeout: any;

      return () => {
        const context = this;
        const args = arguments;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
          fun.apply(context, args);
        }, wait);
      };
    }

    private handleTabChange(tabItem: any): void {
      this.onTabChange(tabItem);
      if (this.couponList[tabItem.name].usableCoupon.length === 0 && !this.couponList[tabItem.name].isAll) {
        this.onLoadingMoreCoupon();
      }
    }

    private get hasMore(): boolean {
      const activeTab = this.couponList.activeTab;
      return this.couponList[activeTab].isAll;
    }

    private get isEmpty(): boolean {
      const activeTab = this.couponList.activeTab;
      return this.couponList[activeTab].usableCoupon === 0;
    }

  }
</script>
