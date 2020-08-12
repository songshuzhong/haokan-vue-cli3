<template>
  <el-radio-group v-model="iValue" :name="name">
    <el-radio
      v-for="(option, index) in options"
      :key="index"
      :label="option.value"
      @change="onChange"
    >
      {{ option.text }}
    </el-radio>
  </el-radio-group>
</template>

<script>
import ElRadioGroup from 'element-ui/lib/radio-group'
import ElRadio from 'element-ui/lib/radio'

export default {
  name: 'MisRadio',
  components: {
    ElRadioGroup,
    ElRadio,
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
    iValue: '',
  }),
  methods: {
    onChange() {
      this.$emit('input', this.iValue)
    },
  },
}
</script>
