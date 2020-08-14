<template>
  <el-menu :mode="mode" @select="onMenuSelect">
    <template v-if="label" slot="title">
      <i :class="icon" />
      {{ label }}
    </template>
    <template v-for="(item, index) in body">
      <component
        :is="item.renderer"
        :key="index"
        :label="item.label"
        :name="item.name"
        :path="path + item + index"
        :children="item.body"
      />
    </template>
  </el-menu>
</template>

<script>
import ElMenu from 'element-ui/lib/menu'

export default {
  name: 'MisMenu',
  components: {
    ElMenu,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    path: {
      type: String,
      required: false,
    },
    mode: {
      type: String,
      required: false,
      default: 'horizontal',
    },
    body: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onMenuSelect(index, path) {
      this.$eventHub.$emit('mis-store:update', this.name, index)
    },
  },
}
</script>
