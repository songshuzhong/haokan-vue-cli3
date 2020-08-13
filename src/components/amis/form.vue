<template>
  <el-form
    v-loading="iLoading"
    class="mis-form"
    ref="mis-form"
    label-width="80px"
    :model="store"
  >
    <mis-field
      v-for="(field, index) in controls"
      :key="field.renderer + index"
      :field="field"
      :action="onBeforeSubmit"
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
      iLoading: false,
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
  mounted() {
    this.$eventHub.$on('mis-field:change', this.onFieldChange)
    this.$eventHub.$on('mis-field:delete', this.onFieldDelete)
  },
  methods: {
    onBeforeSubmit() {
      this.$refs['mis-form'].validate(valid => {
        if (valid) {
          this.sendFormData()
        }
      })
    },
    onFieldChange(name, value) {
      name && (this.store[name] = value)
      this.$eventHub.$emit('mis-store:change', this.store)
    },
    onFieldDelete(name) {
      delete this.store[name]
      this.$eventHub.$emit('mis-store:change', this.store)
    },
    sendFormData() {
      if (this.api) {
        const formData = new FormData()
        for (let name in this.store) {
          if (this.store.hasOwnProperty(name))
            formData.append(name, this.store[name])
        }
        this.iLoading = true
        this.$http(this.api, 'post', formData)
          .then(({ data }) => {
            console.log(data)
          })
          .catch(e => {
            this.$notice({
              type: 'error',
              title: '警告',
              message: e.toString(),
            })
          })
          .finally(() => {
            this.iLoading = false
          })
      }
    },
  },
}
</script>
