<template>
  <div class="ft-extension-wrapper">
    <svg width="100px" height="100px" viewBox="0 0 100 100">
      <circle r="25" cx="50" cy="50" fill="none" stroke="#f00" stroke-width="50" stroke-dasharray="16 158" />
      <circle r="25" cx="50" cy="50" fill="none" stroke="#0f0" stroke-width="50" stroke-dasharray="48 158" stroke-dashoffset="-16"/>
      <circle r="25" cx="50" cy="50" fill="none" stroke="#00f" stroke-width="50" stroke-dasharray="79 158" stroke-dashoffset="-64"/>
    </svg>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
  @keyframes fillup{
    to{
      stroke-dasharray: 158 158
    }
  }
  svg{
    transform: rotate(-90deg);
    background: yellowgreen;
    border-radius: 50%;
  }
  circle{  animation: fillup 5s linear infinite;}
</style>
