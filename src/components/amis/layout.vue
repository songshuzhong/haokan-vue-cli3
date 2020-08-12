<template>
  <el-container>
    <template v-for="(control, index) in controls">
      <component :is="control.renderer" :key="index" v-bind="control" />
    </template>
  </el-container>
</template>

<script>
import ElContainer from 'element-ui/lib/container'
import ElHeader from 'element-ui/lib/header'
import ElAside from 'element-ui/lib/aside'
import ElMain from 'element-ui/lib/main'
import ElFooter from 'element-ui/lib/footer'

export default {
  name: 'MisLayout',
  components: {
    ElContainer,
    ElHeader,
    ElMain,
    ElAside,
    ElFooter,
  },
  props: {
    controls: {
      type: Array,
      required: true,
    },
  },
}
</script>
