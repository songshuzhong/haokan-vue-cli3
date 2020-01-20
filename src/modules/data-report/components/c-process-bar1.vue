<template>
  <div class="ft-process_bar-wrapper" :style="isX ? px : py">
    <div class="ft-process-runner" :style="isX ? rx : ry" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: 0,
      timer: 0,
      length: 280,
      value: 0.4,
      isX: false
    };
  },
  computed: {
    px: function() {
      return {
        width: this.length + 'px',
        height: '4px',
        margin: '6px 10px',
        boxSizing: 'content-box'
      };
    },
    py: function() {
      return {
        height: this.length + 'px',
        width: '4px',
        margin: '10px 6px',
        boxSizing: 'context-box',
        transform: 'rotate(180deg)'
      };
    },
    rx: function() {
      return {
        width: this.progress + 'px'
      };
    },
    ry: function() {
      return {
        height: this.progress + 'px'
      };
    }
  },
  mounted() {
    this.running();
  },
  methods: {
    running() {
      this.timer = setTimeout(() => {
        if (this.progress <= this.value * this.length) {
          this.progress += 1;
          this.running();
        } else {
          clearTimeout(this.timer);
        }
      }, 10);
    },
  }
}
</script>

<style lang="scss">
  .ft-process_bar-wrapper {
    position: relative;
    border-radius: 2px;
    background-color: #EEE;
    overflow: hidden;
    .ft-process-runner {
      height: 4px;
      border-radius: 2px;
      background-color: #FE6D00;
    }
  }
</style>
