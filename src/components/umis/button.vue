<template>
  <el-button
    :type="type"
    :plain="plain"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :icon="icon"
    :nativeType="nativeType"
    @click="onClick"
  >
    {{ text }}
  </el-button>
</template>
<script>
import ElButton from 'element-ui/lib/button'

export default {
  name: 'MisButton',
  components: {
    ElButton,
  },
  props: {
    action: {
      type: Function,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    plain: {
      type: Boolean,
      required: false,
    },
    round: {
      type: Boolean,
      required: false,
    },
    circle: {
      type: Boolean,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    nativeType: {
      type: String,
      required: false,
    },
  },
  methods: {
    onClick() {
      this.action()
    },
  },
}
</script>
