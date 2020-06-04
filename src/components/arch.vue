<template>
  <svg
      class="f-arch"
      width="250px"
      height="250px"
  >
    <circle
        :r="r"
        cx="125"
        cy="125"
        stroke-width="20"
        stroke="#EEEEEE"
        fill="none"
        stroke-dasharray="356 272"
        stroke-linecap="round"
        transform="rotate(168, 125, 125)"
    />
    <circle
        :r="r"
        cx="125"
        cy="125"
        stroke-width="20"
        stroke="#FE6D00"
        fill="none"
        stroke-linecap="round"
        transform="rotate(168, 125, 125)"
    >
      <animate
          dur=".5"
          :from="`0 10000`"
          :to="`${travelled} 10000`"
          attributeName="stroke-dasharray"
          fill="freeze"
      />
    </circle>
    <circle
        :cx="balloon[0]"
        :cy="balloon[1]"
        transform="translate(125, 125) rotate(168)"
        fill="white"
    >
      <animate
          dur="1s"
          from="-10"
          to="5"
          attributeName="r"
          fill="freeze"
      />
    </circle>
    <text class="f-arch__label" x="50%" y="45%" text-anchor="middle" fill="#666666">
      {{title}}
    </text>
    <text class="f-arch__value" x="50%" y="60%" text-anchor="middle" fill="#333">
      {{`${value * 100}%`}}
    </text>
  </svg>
</template>
<script>
    export default {
        name: 'Arch',
        props: {
            value: {
                type: Number,
                required: true,
                default: 1
            },
            title: {
                type: String,
                required: true,
                default: '拱形图'
            }
        },
        data() {
            return {
                r: 100,
                distance: 356,
                travelled: 1,
                balloon: [0, 0],
            }
        },
        watch: {
            value: {
                handler(val) {
                    this.renderCircle(val)
                },
                immediate: true
            }
        },
        methods: {
            renderCircle(value) {
                const angle = (value * 204 * (Math.PI / 180))
                const balloon1 = Math.cos(angle) * (this.r)
                const balloon2 = Math.sin(angle) * (this.r)

                this.balloon = [balloon1, balloon2]
                this.travelled = this.distance * value
            }
        }
    }
</script>
<style lang="scss">
.f-arch__label {
  font-size: 14px;
  font-family: PingFangSC-Regular;
}
.f-arch__value {
  font-size: 30px;
  font-family: PingFangSC-Medium;
}
</style>
