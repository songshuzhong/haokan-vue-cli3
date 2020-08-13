<template>
  <div class="f-pie">
    <svg
      class="f-pie__svg"
      v-if="isReady"
      :width="`${width}px`"
      :height="`${width}px`"
    >
      <circle
        v-for="(data, key) in dataSource"
        :key="key"
        :r="r"
        :cx="width / 2"
        :cy="width / 2"
        :stroke-width="strokeWidth"
        :stroke-dasharray="data.dashArray"
        :transform="data.transform"
        :stroke="data.color"
        fill="none"
      />
    </svg>
    <ul
      v-if="isReady"
      class="f-pie__legends"
    >
      <li
        v-for="(data, k) in dataSource"
        :key="k"
        class="f-pie__legend"
      >
        <i
          class="f-pie__legend__icon"
          :style="getColor(k)"
        />
        <dt class="f-pie__legend__label">
          {{ data.source }}
        </dt>
        <dt class="f-pie__legend__value">
          {{ data.ratio }}%
        </dt>
      </li>
    </ul>
    <div
      class="f-pie__error"
      v-if="!isReady"
    >
      {{msg}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'pie',
  props: {
    dataSource: {
      type: Array,
      required: true,
      default: []
    },
    width: {
      type: Number,
      required: false,
      default: 200
    },
    r: {
      type: Number,
      required: false,
      default: 65,
    },
    strokeWidth: {
      type: Number,
      required: false,
      default: 60
    }
  },
  data() {
    return {
      colors: ['#FFCFAA', '#0f0', '#E14123', '#FF8200', '#4246CA', '#999'],
      msg: '',
      isReady: false,
    }
  },
  watch: {
    dataSource: {
      handler(val) {
        this.formatedDataSource(val)
      },
      immediate: true
    },
    r: {
      handler(val) {
        if (val * 2 > this.width - this.strokeWidth) {
          console.warn('警告：组件Pie直径超过容器宽度！')
        }
      },
      immediate: true
    }
  },
  methods: {
    formatedDataSource(dataSource) {
      let angle = -90;

      dataSource.forEach((data, index) => {
        try {
          const dash1 = Math.round(data.ratio * .01 * Math.PI * this.r * 2);
          const dash2 = Math.round((1 - data.ratio * .01) * Math.PI * this.r * 2);

          data.transform = `rotate(${angle}, ${this.width / 2}, ${this.width / 2})`;
          data.dashArray = `${dash1} ${dash2}`;
          data.color = this.getColor(index).background;
          angle += 360 * data.ratio * .01;

          this.isReady = true;
        } catch (e) {
          this.isReady = false;
          this.msg = e.message;
        }
      });
    },
    getColor(key) {
      return {
        background: this.colors[key % this.colors.length],
      }
    },
  }
}
</script>

<style lang="scss">
  @keyframes rotate {
    0% {
      transform: rotate(0deg) scale(0);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
  .f-pie {
    display: flex;
    align-items: center;
  }
  .f-pie__svg {
    animation: rotate .5s ease-in-out;
  }
  .f-pie__legends {
    position: relative;
    display: flex;
    padding: 0;
    margin: 0 20px;
    flex-direction: column;
    flex-grow: 1;
  }
  .f-pie__legend {
    position: relative;
    height: 15px;
    width: 100%;
    margin-top: 4px;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
  }
  .f-pie__legend__icon {
    width: 14px;
    height: 14px;
    margin-right: 4px;
    box-sizing: border-box;
    border-radius: 4px;
  }
  .f-pie__legend__label {
    width: 75px;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #666;
    letter-spacing: 0;
  }
  .f-pie__legend__value {
    flex-grow: 1;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #333;
    text-align: right;
  }
  .f-pie__error {
    width: 100%;
    height: 100%;
    margin: 6px;
    padding: 7px;
    background: #FFFFFF;
    border-radius: 8px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #999999;
  }
</style>
