<template>
  <el-menu :mode="mode" @select="onMenuSelect" :default-active="defaultActive">
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
    defaultActive: {
      type: String,
      required: false,
    },
    store: {
      type: Object,
      required: true,
    },
    body: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.onMenuSelect(this.defaultActive)
    })
  },
  methods: {
    onMenuSelect(index) {
      const store = this.store
      store[this.name] = index
      this.$eventHub.$emit('mis-store:change', store)
    },
  },
}
</script>
