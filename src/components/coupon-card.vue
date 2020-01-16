<template>
  <div class="ft-coupon-cards-wrapper">
    <section class="ft-coupon-card" v-for="(card, index) in cards" :key="index">
      <div class="ft-coupon-card-body">
        <div class="ft-coupon-money">
          <div :class='[card["type"] === "discount" ? "ft-coupon-discount ft-coupon-discount-plus" : "ft-coupon-discount"]'>
            <div class="ft-coupon-number">{{card['type'] === 'full' ? card['price'] : card['discount']}}</div>
            <div class="ft-coupon-icon" v-if="card['type'] === 'full'">¥</div>
            <div class="ft-coupon-icon" v-if="card['type'] === 'discount'">折</div>
          </div>
          <div class="ft-coupon-desc">
            <div class="ft-coupon-title">{{couponText[card.scope].title}}</div>
            <div class="ft-coupon-details">
              {{
              card['type'] === 'full'
              ? couponText[card.scope].full.replace('FULL', card['full'])
              : couponText[card.scope].discount.replace('PRICE', card['price'])
              }}
            </div>
          </div>
        </div>
        <div class="ft-coupon-usable">
          <div class="ft-coupon-use" v-if="card['type'] === 'full'">满{{card['full']}}可用</div>
          <div class="ft-coupon-time">有效期至{{card['expireTime']}}</div>
        </div>
        <div v-if="card['expired'] == 1" class="ft-coupon-voertime" />
      </div>
      <div v-if="card['expired'] == 0" class="ft-coupon-card-foot">
        <a :href="card['useRuleUrl']" class="ft-coupon-rules">使用规则&nbsp;></a>
        <a href="//promote.biz.weibo.cn/members/coupon/use" class="ft-coupon-btn">立即使用</a>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class CouponCard extends Vue {
  @Prop() private cards!: any[];

  private couponText: object = {
    A: {title: '全场通用券', discount: '最高抵扣PRICE元，购买博文头条产品全场通用。', full: '满FULL元可用，购买博文头条产品全场通用。'},
    B: {title: '我的粉丝折扣券', discount: '最高抵扣PRICE元，限购买"推广给我的粉丝"使用。', full: '满FULL元可用，限购买"推广给我的粉丝"使用。'},
    C: {title: '更多用户通用券', discount: '最高抵扣PRICE元，限购买"推广给更多用户"使用，包括潜在粉丝、兴趣用户、指定账号的相似粉丝、指定商圈用户、关键词搜索用户。', full: '满FULL元可用，限购买"推广给更多用户"使用,包括潜在粉丝、兴趣用户、指定账号的相似粉丝、指定商圈用户、关键词搜索用户。'},
    D: {title: '兴趣用户券', discount: '最高抵扣PRICE元，仅限购买"推广给更多用户"中的兴趣用户使用。', full: '满FULL元可用，仅限购买"推广给更多用户"中的兴趣用户使用。'},
    E: {title: '指定商圈券', discount: '最高抵扣PRICE元，仅限购买"推广给更多用户"中的指定商圈用户使用。', full: '满FULL元可用，仅限购买"推广给更多用户"中的指定商圈用户使用。'},
    F: {title: '潜在粉丝券', discount: '最高抵扣PRICE元，仅限购买"推广给更多用户"中的潜在粉丝使用。', full: '满FULL元可用，仅限购买"推广给更多用户"中的潜在粉丝使用。'},
    H: {title: '指定账号券', discount: '满FULL元可用，仅限购买"推广给更多用户"中的指定账号的相似粉丝使用。', full: '满FULL元可用，仅限购买"推广给更多用户"中的指定账号的相似粉丝使用。'},
    K: {title: '内容定向券', discount: '最高抵扣PRICE元，仅限购买"推广给更多用户"中的内容定向部分使用。', full: '满FULL元可用，仅限购买"推广给更多用户"中的内容定向部分使用。'},
    L: {title: '智能优选券', discount: '最高抵扣PRICE元，仅限购买"推广给更多用户"中的智能优选部分使用。', full: '满FULL元可用，仅限购买"推广给更多用户"中的潜在粉丝使用。'}
  };
}
</script>
<style lang="scss">
.ft-coupon-cards-wrapper {
  padding: 50px 12px 0 12px;
  overflow: scroll;
  .ft-coupon-card {
    width: 351px;
    margin-bottom: 10px;
    border-radius: 8px;
    background: white;
    .ft-coupon-card-body {
      position: relative;
      padding: 15px 15px 15px 0;
      .ft-coupon-money {
        display: flex;
        .ft-coupon-discount-plus {
          margin-top: 21px;
        }
        .ft-coupon-discount {
          width: 106px;
          height: 36px;
          padding-top: 21px;
          padding-left: 19px;
          padding-right: 19px;
          margin-top: 10px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          box-sizing: border-box;
          .ft-coupon-icon {
            width: 9px;
            height: 20px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FE6D00;
          }
          .ft-coupon-number {
            height: 45px;
            font-family: PingFangSC-Medium;
            font-size: 36px;
            color: #FE6D00;
          }
        }
        .ft-coupon-desc {
          flex: 1;
          .ft-coupon-title {
            height: 21px;
            margin-bottom: 4px;
            font-family: PingFangSC-Medium;
            font-size: 15px;
            line-height: 21px;
            color: #212121;
          }
          .ft-coupon-details {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            line-height: 17px;
            color: #666666;
          }
        }
      }
      .ft-coupon-usable {
        position: relative;
        height: 16px;
        margin-top: 5px;
        .ft-coupon-use {
          position: absolute;
          width: 106px;
          height: 16px;
          box-sizing: content-box;
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: 11px;
          color: #999999;
        }
        .ft-coupon-time {
          margin-left: 106px;
          font-family: PingFangSC-Regular;
          font-size: 11px;
          color: #999999;
        }
      }
      .ft-coupon-voertime {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 52px;
        height: 52px;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("../assets/imgs/img-overtime.png");
      }
    }
    .ft-coupon-card-foot {
      position: relative;
      height: 36px;
      margin: 0 15px;
      display: flex;
      align-items: center;
      border-top: dashed 1px grey;
      .ft-coupon-rules {
        position: absolute;
        left: 0;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #417EB3;
      }
      .ft-coupon-btn {
        position: absolute;
        right: 0;
        width: 64px;
        height: 24px;
        border-radius: 13px;
        background: #FF8200;
        line-height: 24px;
        text-align: center;
        color: white;
        font-family: PingFangSC-Medium;
        font-size: 11px;
      }
    }
  }
}
</style>