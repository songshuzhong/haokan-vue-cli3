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
import switches from '~components/umis/switches'

export default {
  name: 'MisField',
  components: {
    ElFormItem,
  },
  props: {
    name: {
      type: String,
      required: false,
    },
    field: {
      type: Object,
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
  },
  mixins: [switches],
  mounted() {
    this.iValue = this.field.value
    this.$eventHub.$emit('mis-field:change', this.field.name, this.iValue)
  },
  methods: {
    onInput(value) {
      this.iValue = value
      this.$eventHub.$emit('mis-field:change', this.field.name, value)
    },
  },
}
</script>
