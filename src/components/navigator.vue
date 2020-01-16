<template>
  <header :class='[isFixed ? "ft-coupon-nav-wrapper ft-nav-fixed" : "ft-coupon-nav-wrapper"]'>
    <ul class="ft-coupon-ul ft-border-1px">
      <li
        v-for="(item, index) in items"
        :class='[activeTab === item.name? "ft-coupon-li active": "ft-coupon-li"]'
        :key="index"
        @click="onTabChange(item)"
      >
        <span>{{item.text}}</span>
      </li>
    </ul>
  </header>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class Navigator extends Vue {
  @Prop() protected items!: any[];
  @Prop({default: 'exclusive'}) private activeItem!: string;
  @Prop({default: false}) private isFixed!: boolean;

  private activeTab!: string;
  private data() {
    return {
      activeTab: this.activeItem,
    };
  }
  private onTabChange(tabItem: any) {
    this.activeTab = tabItem.name;
    this.$emit('toggle-tab', tabItem);
  }
}
</script>

<style lang="scss" scoped>
.ft-coupon-nav-wrapper {
  position: relative;
  margin-bottom: 10px;
  background: white;
  box-shadow: inset 0 0 0 0 #E7E7E7;
  .ft-coupon-ul {
    width: 375px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .ft-coupon-li {
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #999999;
      box-shadow: inset 0 0 0 0 #E7E7E7;
      &.active {
        font-family: PingFangSC-Medium;
        font-size: 15px;
        color: #212121;
        span {
          position: relative;
        }
        span:after {
          position: absolute;
          top: 26px;
          left: 50%;
          width: 20px;
          height: 3px;
          background: #FE6D00;
          border-radius: 1.5px;
          content: '';
          transform: translate3d(-50%, 0, 0);
          transform-origin: left top;
          transition: all .3s;
          transition-timing-function: ease-in-out;
        }
      }
    }
  }
}
.ft-nav-fixed {
  position: fixed;
  z-index: 2020;
}
</style>