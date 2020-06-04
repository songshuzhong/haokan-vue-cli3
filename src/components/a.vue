<template>
  <svg
      class="f-arch"
      width="250px"
      height="250px"
  >
    <circle
        r="100"
        cx="125"
        cy="125"
        stroke-width="20"
        stroke="white"
        fill="none"
        stroke-dasharray="356 272"
        stroke-linecap="round"
        transform="rotate(168, 125, 125)"
    />
    <circle
        r="100"
        cx="125"
        cy="125"
        stroke-width="20"
        stroke="#FE6D00"
        fill="none"
        stroke-linecap="round"
        transform="rotate(168, 125, 125)"
    >
      <animate
          dur="1"
          :from="`0 10000`"
          :to="`314 10000`"
          attributeName="stroke-dasharray"
          fill="freeze"
      />
    </circle>
    <circle cx="50" cy="50" r="50"/>
  </svg>
</template>
<script>
</script>
<style lang="scss">
</style>
