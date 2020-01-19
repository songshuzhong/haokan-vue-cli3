<template>
  <div class="ft-extension-wrapper">
    <div class="ft-extension-title">推广完成率</div>
    <div class="ft-process-wrapper">
      <div class="ft-process-outer">
        <div class="ft-process-inner"></div>
        <div class="ft-process-mask"></div>
      </div>
      <div class="ft-process-inner-content">
        <div>人群定向</div>
        <div>107%</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  @Component
  export default class Processor extends Vue {}
</script>
<style lang="scss">
  .ft-extension-wrapper {
    position: relative;
    height: 343px;
    margin: 12px;
    box-sizing: border-box;
    background-color: white;
    overflow: hidden;
    .ft-extension-title {
      margin: 15px;
      text-align: left;
      font-family: PingFangSC-Medium;
      font-size: 15px;
      color: #333333;
      letter-spacing: 0;
    }
    .ft-process-wrapper {
      position: relative;
      // clip-path: polygon(0 0, 100% 0, 100% 60%, 0 60%);
      .ft-process-outer{
        position: relative;
        width: 200px;
        height: 200px;
        margin: 0 auto;
        background-color: #FE6D00;
        border-radius: 50%;
      }
      .ft-process-mask {
        position: absolute;
        top: 120px;
        width: 200px;
        height: 80px;
        background-color: white;
      }
      .ft-process-inner{
        position: absolute;
        width: 160px;
        height: 160px;
        border-radius: 50%;
        background-color: white;
        top: 20px;
        left: 20px;
      }
      .ft-process-inner-content {
        position: absolute;
        top: 60%;
        left: 50%;
        width: 101px;
        height: 62px;
        display: flex;
        flex-direction: column;
        transform: translate3d(-50%, -100%, 0);
        div {
          &:first-child {
            width: 100%;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #666666;
            letter-spacing: 0;
            text-align: center;
          }
          &:last-child {
            width: 100%;
            font-family: PingFangSC-Medium;
            font-size: 30px;
            color: #333333;
            letter-spacing: 0;
            text-align: center;
          }
        }
      }
    }
  }
</style>
