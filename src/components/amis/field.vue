<template>
  <el-form-item
    v-if="iVisible"
    :label="field.label"
    :prop="field.name"
    :class="field.className"
    :rules="field.rules"
  >
    <component
      v-bind="field"
      :is="field.renderer"
      :name="field.name"
      :value="iValue"
      :disabled="iDisabled"
      :action="action"
      @input="onInput($event)"
    />
  </el-form-item>
</template>

<script>
import ElFormItem from 'element-ui/lib/form-item'
export default {
  name: 'MisField',
  components: {
    ElFormItem,
  },
  props: {
    field: {
      type: Object,
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      iValue: '',
      iVisible: true,
      iDisabled: false,
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
