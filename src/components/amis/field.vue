<template>
  <mis-form-item
    v-if="iVisible"
    :label="field.label"
    :prop="field.name"
    :class="field.className"
    :rules="field.rules"
  >
    <component
      v-bind="field"
      :is="field.type"
      :name="field.name"
      :value="iValue"
      :disabled="iDisabled"
      @input="onInput($event)"
    />
  </mis-form-item>
</template>

<script>
export default {
  name: 'MisField',
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      iValue: '',
      iVisible: true,
      iDisabled: false,
      iLoading: false,
    }
  },
  watch: {
    iVisible: {
      handler(val) {
        if (!val) {
          this.iValue = ''
          this.eventHub.$emit('mis-field:delete', this.field.name)
        } else {
          this.iValue = this.field.value
          this.eventHub.$emit('mis-field:change', this.field.name, this.iValue)
        }
      },
    },
    iDisabled: {
      handler(val) {
        if (val) {
          this.iValue = ''
          this.eventHub.$emit('mis-field:change', this.field.name, '')
        }
      },
    },
  },
  inject: ['eventHub'],
  mounted() {
    this.iValue = this.field.value
    this.eventHub.$emit('mis-field:change', this.field.name, this.iValue)
    this.eventHub.$on('mis-store:change', this.onStoreChange)
    if (this.field.api) {
      this.iLoading = true
      this.$http(this.field.api, 'get')
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
  methods: {
    onInput(value) {
      this.iValue = value
      this.eventHub.$emit('mis-field:change', this.field.name, value)
    },
    onStoreChange(store) {
      this.store = store
      if (this.field.visibleOn) {
        this.iVisible = this.$onExpressionEval(this.field.visibleOn, this.store)
      }
      if (this.field.disabledOn) {
        this.iDisabled = this.$onExpressionEval(
          this.field.disabledOn,
          this.store
        )
      }
    },
  },
}
</script>
