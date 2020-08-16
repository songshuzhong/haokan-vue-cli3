<template>
  <div class="mis">
    <component
      v-for="(item, index) in schema"
      v-bind="item"
      :key="index"
      :is="item.renderer"
      :store="store"
      :visibleOn="item.visibleOn"
      :disabledOn="item.disabledOn"
      @input="onInput"
    />
  </div>
</template>
<script>
import schema from '~components/amis/schema'

import 'element-theme-chalk/lib/index.css'

export default {
  name: 'MIS',
  data() {
    return {
      schema,
      store: {},
    }
  },
  mounted() {
    this.$eventHub.$on('mis-store:update', this.onStoreUpdate)
  },
  methods: {
    onInput(value) {
      console.log(value)
    },
    onStoreUpdate(name, value) {
      this.store[name] = value
    },
  },
}
</script>
