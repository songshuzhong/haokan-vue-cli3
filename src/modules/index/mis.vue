<template>
  <div>
    <div v-for="(item, index) in schema">
      <component v-bind="item" :is="item.type" :key="index" />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import mixins from '~components/amis/mixin'
import schema from '~components/amis/schema'
const store = {}

export default {
  name: 'MIS',
  data() {
    return {
      eventHub: new Vue(),
      store,
      schema,
    }
  },
  mixins: [mixins],
  provide() {
    return {
      eventHub: this.eventHub,
    }
  },
}
</script>
<style lang="scss">
body {
  padding: 20px;
}
</style>
