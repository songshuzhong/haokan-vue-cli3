<template>
  <el-form
    v-loading="iLoading"
    v-show="iVisible"
    class="mis-form"
    ref="mis-form"
    label-width="80px"
    :model="store"
  >
    <mis-field
      v-for="(field, index) in controls"
      :key="field.renderer + index"
      :name="field.name"
      :field="field"
      :visibleOn="field.visibleOn"
      :disabledOn="field.disabledOn"
      :action="onBeforeSubmit"
    />
  </el-form>
</template>
<script>
import ElForm from 'element-ui/lib/form'

import switches from '~components/amis/switches'

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
    name: {
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
  mixins: [switches],
  watch: {
    store: {
      handler(val) {
        this.$eventHub.$emit('mis-store:update', this.name, val)
      },
      deep: true,
    },
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
