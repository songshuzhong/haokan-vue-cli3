<template>
  <el-form
    v-loading="iLoading"
    v-if="iVisible"
    class="mis-form"
    ref="mis-form"
    label-width="80px"
    :model="formData"
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

import switches from '~components/umis/switches'

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
      formData: this.controls.reduce((total, control) => {
        const name = control.name || ''
        const value = control.value || ''
        if (name) {
          total[name] = value
        }
        return total
      }, {}),
    }
  },
  watch: {
    formData: {
      handler(val) {
        this.$eventHub.$emit('mis-store:update', val, this.name)
      },
      immediate: true,
      deep: true,
    },
  },
  mixins: [switches],
  mounted() {
    this.$eventHub.$on('mis-field:delete', this.onFieldDelete)
    this.$eventHub.$on('mis-field:change', this.onFieldChange)
    this.$nextTick(() => {
      this.$eventHub.$emit('mis-store:update', this.formData, this.name)
    })
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
      name && (this.formData[name] = value)
      this.$eventHub.$emit('mis-store:update', this.formData)
    },
    onFieldDelete(name) {
      delete this.formData[name]
      this.$eventHub.$emit('mis-store:update', this.formData)
    },
    sendFormData() {
      if (this.api) {
        const formData = new FormData()
        for (let name in this.formData) {
          if (this.formData.hasOwnProperty(name))
            formData.append(name, this.formData[name])
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
