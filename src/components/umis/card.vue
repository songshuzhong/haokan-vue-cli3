<template>
  <div>
    <el-card v-for="(item, index) in body" :shadow="shadow">
      <component
        :is="item.renderer"
        :key="index"
        :label="item.label"
        :name="item.name"
        :children="item.body"
      />
    </el-card>
  </div>
</template>

<script>
import ElCard from 'element-ui/lib/card'
export default {
  name: 'MisCard',
  components: {
    ElCard,
  },
  props: {
    body: {
      type: [Array],
      required: true,
    },
    shadow: {
      type: String,
      required: false,
      options: ['always', 'hover', 'never'],
      default: 'always',
    },
  },
}
</script>
