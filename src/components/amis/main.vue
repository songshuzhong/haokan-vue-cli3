<template>
  <el-main>
    <template v-for="(control, index) in controls">
      <component :is="control.renderer" :key="index" v-bind="control" />
    </template>
  </el-main>
</template>

<script>
import ElMain from 'element-ui/lib/main'

export default {
  name: 'MisMain',
  components: {
    ElMain,
  },
  props: {
    controls: {
      type: Array,
      required: true,
    },
  },
}
</script>
