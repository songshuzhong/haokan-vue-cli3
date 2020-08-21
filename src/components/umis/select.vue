<template>
  <el-select
    v-model="iValue"
    multiple
    :name="name"
    :disabled="disabled"
    placeholder="请选择"
    @change="onChange"
  >
    <el-option
      v-for="option in options"
      :key="option.value"
      :label="option.test"
      :value="option.value"
      :disabled="option.disabled"
    >
    </el-option>
  </el-select>
</template>
<script>
import ElSelect from 'element-ui/lib/select'
import ElOption from 'element-ui/lib/option'
export default {
  name: 'MisSelect',
  components: {
    ElSelect,
    ElOption,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    multiple: {
      type: Boolean,
      required: false,
    },
  },
  data: () => ({
    iValue: '',
  }),
  methods: {
    onChange() {
      this.$emit('input', this.iValue)
    },
  },
}
</script>
