<template>
  <el-checkbox-group v-model="iValue" :name="name">
    <el-checkbox
      v-for="(option, index) in options"
      :key="index"
      :label="option.value"
      @change="onSelect"
    >
      {{ option.text }}
    </el-checkbox>
  </el-checkbox-group>
</template>
<script>
import ElCheckboxGroup from 'element-ui/lib/checkbox-group'
import ElCheckbox from 'element-ui/lib/checkbox'

export default {
  name: 'MisCheckbox',
  components: {
    ElCheckboxGroup,
    ElCheckbox,
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
  },
  data: () => ({
    iValue: [],
  }),
  methods: {
    onSelect() {
      this.$emit('input', this.iValue)
    },
  },
}
</script>
