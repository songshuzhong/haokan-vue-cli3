<template>
  <el-form class="mis-form" label-width="80px" :model="store">
    <mis-field
      v-for="(field, index) in controls"
      :key="field.type + index"
      :field="field"
    />
  </el-form>
</template>
<script>
import ElForm from 'element-ui/lib/form'

export default {
  name: 'MisForm',
  components: {
    ElForm,
  },
  props: {
    api: {
      type: String,
      required: false,
    },
    controls: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      store: this.controls.reduce((total, control) => {
        const name = control.name || ''
        const value = control.value || ''
        if (name) {
          total[name] = value
        }
        return total
      }, {}),
    }
  },
  inject: ['eventHub'],
  mounted() {
    this.eventHub.$on('mis-field:change', this.onFieldChange)
    this.eventHub.$on('mis-field:delete', this.onFieldDelete)
  },
  methods: {
    onFieldChange(name, value) {
      name && (this.store[name] = value)
      this.eventHub.$emit('mis-store:change', this.store)
    },
    onFieldDelete(name) {
      delete this.store[name]
      this.eventHub.$emit('mis-store:change', this.store)
    },
  },
}
</script>
