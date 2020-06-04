<template>
  <div class="f-contact">
    <svg width="100px" height="100px" viewBox="0 0 100 100">
      <circle r="25" cx="50" cy="50" fill="yellowgreen" stroke="#655" stroke-width="50" stroke-dasharray="0 158"/>
    </svg>
  </div>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
.f-contact {

  @keyframes fillup {
    to {
      stroke-dasharray: 158 158;
    }
  }

  svg {
    transform: rotate(-90deg);
    background: yellowgreen;
    border-radius: 50%;
  }

  circle {
    animation: fillup 5s linear;
  }

}
</style>
