<template>
  <canvas ref="processBar" style="border:1px solid #ccc;"></canvas>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
      default: 0
    },
    max: {
      type: Number,
      required: true,
      default: 291
    },
  },
  data() {
    return {
      progress: 0,
      timer: 0
    };
  },
  mounted() {
    const canvas = this.$refs.processBar;
    canvas.width = this.max;
    canvas.height = 4;
    this.ctx = canvas.getContext('2d');
    const pixelRatio = this.getPixelRatio(this.ctx);
    this.drawProgress();
  },
  methods: {
    getPixelRatio(context) {
      const backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
      return (window.devicePixelRatio || 1) / backingStore;
    },
    drawProgress() {
      this.ctx.clearRect(0,0, this.max, 4);
      this.drawBg();
      this.ctx.beginPath();
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = '#FE6D00';
      this.ctx.moveTo(0, 2);
      this.ctx.lineTo(this.progress,2);
      this.ctx.stroke();
      this.ctx.closePath();
      this.progress++;
      if(this.progress <= this.max && this.progress <= this.value){
        this.timer = setTimeout(()=>{
          this.drawProgress();
        },10)
      } else {
        clearTimeout(this.timer);
      }
    },
    drawBg() {
      this.ctx.beginPath();
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = '#EEEEEE';
      this.ctx.moveTo(0, 2);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }
}
</script>

<style lang="scss">
  .css {
    height: 4px;
    border-radius: 2px;
    background-color: #FE6D00;
  }
</style>
