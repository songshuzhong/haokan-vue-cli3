<template functional>
  <div class="ft-coupon-spinner">
    <img
      :src="require('../assets/imgs/spinner.svg')"
      :style="[{display: (hasMore ? 'none' : 'block')}]"
    />
    <div
      :style="[{display: (hasMore ? 'block' : 'none')}]">没有更多了！
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
  @Prop({default: false}) private hasMore!: boolean;
}
</script>
<style lang="scss">
  .ft-coupon-spinner {
    width: 100%;
    height: 69px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    img {
      height: 32px;
      width: 32px;
    }
  }
</style>
