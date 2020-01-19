<template>
  <div class="ft-extension-wrapper">
    <f-echarts class="ft-processor-pie" :options="polar"/>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import ECharts from 'vue-echarts';
  import 'echarts/lib/chart/pie';
  import 'echarts/lib/component/tooltip';

  @Component({
    components: {
      FEcharts: ECharts
    }
  })
  export default class View1 extends Vue {
    private polar = {
      backgroundColor: '#fff',
      series: [
        {
          name: '一般',
          type: 'pie',
          startAngle: 0,
          hoverAnimation: false,
          tooltip: {},
          radius: ['30%', '47%'],
          center: ['50%', '80%'],
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            value: 300,
            itemStyle: {
              normal: {
                color: 'rgba(80,150,224,0)'
              }
            }
          },
            {
              value: 270,
              itemStyle: {
                normal: {
                  color: '#FE6D00'
                }
              }

            },
            {
              value: 30,
              itemStyle: {
                normal: {
                  color: 'rgba(80,150,224,0.1)'
                }
              }
            },

          ]
        },
      ]
    };
  }
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
    .echarts {
      width: 400px;
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
  }
</style>
