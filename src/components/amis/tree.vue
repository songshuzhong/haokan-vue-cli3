<template>
  <el-tree :data="value" />
</template>

<script>
import ElTree from 'element-ui/lib/tree'

export default {
  name: 'MisTree',
  components: {
    ElTree,
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
}
</script>
