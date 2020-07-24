<template>
  <div class="f-contact">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" :height="height" :width="width">
      <rect
          height="4"
          width="300"
          stroke-width="10"
          fill="#EEE"
          stroke-linecap="round"
          rx="2"
          ry="2"
      />
      <rect
          height="4"
          fill="#FE6D00"
          stroke-width="10"
          stroke-linecap="round"
          rx="2"
          ry="2"
      >
        <animate
          from="0"
          :to="value"
          dur="2"
          attributeName="width"
          fill="freeze"
        />
      </rect>
    </svg>
  </div>
</template>


<script>
export default {
    name: 'ProgressBar',
    props: {
        ratio: {
            type: Number,
            required: false,
            default: 1
        },
        width: {
            type: Number,
            required: false,
            default: 300
        },
        height: {
            type: Number,
            required: false,
            default: 4
        }
    },
    data() {
        return {
            value: 1
        }
    },
    watch: {
        ratio: {
            handler(val) {
                this.running(val)
            },
            immediate: true
        }
    },
    methods: {
        running(val) {
            this.value = val * this.width
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
