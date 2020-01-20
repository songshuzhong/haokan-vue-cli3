<template>
  <div class="ft-extension-wrapper">
    <div class="ft-extension-title">推广完成率</div>
    <div class="ft-process-wrapper">
      <canvas class="ft-process-canvas"/>
    </div>
    <div class="ft-process-inner-content">
      <div>{{title}}</div>
      <div class="ft-process-text"/>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';

  @Component
  export default class ProcessPie extends Vue {
    @Prop({default: '人群定向'})
    private title!: string;

    get ctx(): HTMLCanvasElement {
      const canvas = document.querySelector('.ft-process-canvas');
      // @ts-ignore
      canvas.width = 200;
      // @ts-ignore
      canvas.height = 200;
      // @ts-ignore
      const ctx = canvas.getContext('2d');
      const ratio = this.getPixelRatio(ctx);
      // @ts-ignore
      canvas.width *= ratio;
      // @ts-ignore
      canvas.height *= ratio;
      return ctx;
    }

    private data() {
      return {
        radius: 100,
        thickness: 20,
        innerRadius: 80,
        startAngle: -195,
        endAngle: 15,
        x: 0,
        y: 0
      };
    }

    private mounted() {
      // @ts-ignore
      this.ctx.translate(100, 100);
      // @ts-ignore
      this.ctx.fillStyle = '#eee'; // 初始填充颜色
      // @ts-ignore
      this.renderRing(this.startAngle, this.endAngle);
      // @ts-ignore
      const lingrad = this.ctx.createLinearGradient(0, 0, 150, 0);
      lingrad.addColorStop(0, '#FE6D00');
      // @ts-ignore
      this.ctx.fillStyle = lingrad;
      this.renderPie();
    }

    private getPixelRatio(context: any) {
      const backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
      return (window.devicePixelRatio || 1) / backingStore;
    }

    private renderRing(startAngle: number, endAngle: number) {
      // @ts-ignore
      this.ctx.beginPath();
      // @ts-ignore 绘制外环
      this.ctx.arc(this.x, this.y, this.radius, this.angle2Radian(startAngle), this.angle2Radian(endAngle));
      // @ts-ignore 计算外环与内环第一个连接处的中心坐标
      const oneCtrlPoint = this.calcRingPoint(this.x, this.y, this.innerRadius + this.thickness / 2, endAngle);
      // @ts-ignore 绘制外环与内环第一个连接处的圆环
      this.ctx.arc(oneCtrlPoint.x, oneCtrlPoint.y, this.thickness / 2, this.angle2Radian(-90), this.angle2Radian(270));
      // @ts-ignore 绘制内环
      this.ctx.arc(this.x, this.y, this.innerRadius, this.angle2Radian(endAngle), this.angle2Radian(startAngle), true);
      // @ts-ignore 计算外环与内环第二个连接处的中心坐标
      const twoCtrlPoint = this.calcRingPoint(this.x, this.y, this.innerRadius + this.thickness / 2, startAngle);
      // @ts-ignore 绘制外环与内环第二个连接处的圆环
      this.ctx.arc(twoCtrlPoint.x, twoCtrlPoint.y, this.thickness / 2, this.angle2Radian(-90), this.angle2Radian(270));
      // @ts-ignore
      this.ctx.closePath();
      // @ts-ignore
      this.ctx.arc(0, 0, 5, 0, Math.PI * 2);
      // @ts-ignore
      this.ctx.fill();
      // ctx.stroke()
    }

    private renderPie() {
      // @ts-ignore开始绘画
      let tempAngle = this.startAngle;
      const total = 1000; // 总分
      const now = 900; // 当前分数
      const percent = now / total; // 百分比
      // @ts-ignore
      const twoEndAngle = percent * 210 + this.startAngle;
      // @ts-ignore
      const step = (twoEndAngle - this.startAngle) / 80;
      const numberSpan: any = document.querySelector('.ft-process-text');
      const inter = setInterval(() => {
        if (tempAngle > twoEndAngle) {
          clearInterval(inter);
        } else {
          numberSpan.innerText = percent * 100 + '%';
          tempAngle += step;
        }
        if (tempAngle >= 150) {
          tempAngle = 150;
        }

        // @ts-ignore
        this.renderRing(this.startAngle, tempAngle);
      }, 20);
    }

    private calcRingPoint(x: number, y: number, radius: number, angle: number): any {
      const res = {x: 0, y: 0};
      res.x = x + radius * Math.cos(angle * Math.PI / 180);
      res.y = y + radius * Math.sin(angle * Math.PI / 180);

      return res;
    }

    private angle2Radian(radian: number): number {
      return radian * Math.PI / 180;
    }
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
      font-weight: 700;
      color: #333333;
      letter-spacing: 0;
    }

    .ft-process-wrapper {
      position: relative;
      width: 200px;
      margin: 0 auto;

      canvas {
        width: 200px;
        height: 200px;
      }
    }

    .ft-process-inner-content {
      position: absolute;
      top: 55%;
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
</style>
