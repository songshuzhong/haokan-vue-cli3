<template>
  <el-aside>
    <template v-for="(item, index) in body">
      <component :is="item.renderer" :key="index" v-bind="item" />
    </template>
  </el-aside>
</template>

<script>
import ElAside from 'element-ui/lib/aside'

export default {
  name: 'MisAside',
  components: {
    ElAside,
  },
  props: {
    body: {
      type: Array,
      required: true,
    },
  },
}
</script>
