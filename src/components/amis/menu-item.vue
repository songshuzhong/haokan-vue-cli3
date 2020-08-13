<template>
  <el-menu-item :name="name" :index="name">
    {{ label }}
  </el-menu-item>
</template>

<script>
import ElMenuItem from 'element-ui/lib/menu-item'

export default {
  name: 'MisMenuItem',
  components: {
    ElMenuItem,
  },
  props: {
    label: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    path: {
      type: String,
      required: false,
    },
  },
}
</script>
