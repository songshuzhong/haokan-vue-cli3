<template>
  <div class="f-contact">
    <router-link to="/"><h2>HOME</h2></router-link>
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
