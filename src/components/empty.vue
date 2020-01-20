<template>
  <div
      :style="[{display: (isEmpty ? 'block' : 'none')}]"
      class="ft-coupon-empty"/>
</template>
<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Empty extends Vue {
    @Prop({default: false}) private isEmpty!: boolean;
  }
</script>
<style lang="scss">
  .ft-coupon-empty {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 160px;
    height: 160px;
    transform: translate(-50%, -100%);
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("../assets/imgs/img-empty.png");
  }
</style>
