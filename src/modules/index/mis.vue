<template>
  <div class="mis">
    <component
      v-for="(item, index) in schema"
      v-bind="item"
      :is="item.renderer"
      :key="index"
      @input="onInput"
    />
  </div>
</template>
<script>
import Vue from 'vue'
import schema from '~components/amis/schema'
const eventHub = new Vue()

eventHub.store = {}

export default {
  name: 'MIS',
  data() {
    return {
      schema,
    }
  },
  provide() {
    return {
      eventHub,
    }
  },
  methods: {
    onInput(value) {},
  },
}
</script>
