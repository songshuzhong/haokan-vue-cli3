<template>
  <el-menu-item-group>
    <template slot="title">
      <i class="el-icon-menu" />
      {{ label }}
    </template>
    <template v-for="(child, index) in children">
      <component
        :is="child.renderer"
        :key="index"
        :label="child.label"
        :name="child.name"
        :children="child"
      />
    </template>
  </el-menu-item-group>
</template>

<script>
import ElMenuItemGroup from 'element-ui/lib/menu-item-group'

export default {
  name: 'MisMenuItemGroup',
  components: {
    ElMenuItemGroup,
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
    children: {
      type: [Array, Object],
      required: true,
    },
  },
}
</script>
