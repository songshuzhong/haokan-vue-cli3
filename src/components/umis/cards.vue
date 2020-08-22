<template>
  <el-row v-if="iVisible" :gutter="gutter">
    <el-col v-for="(item, index) in body" :span="span">
      <el-card :shadow="shadow">
        <template slot="header">
          <div v-html="item.header" />
        </template>
        <component
          v-bind="item"
          :is="item.renderer"
          :key="index"
          :label="item.label"
          :name="item.name"
          :children="item.body"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import ElRow from 'element-ui/lib/row'
import ElCol from 'element-ui/lib/col'
import ElCard from 'element-ui/lib/card'

import switches from '~components/umis/switches'

export default {
  name: 'MisCards',
  components: {
    ElRow,
    ElCol,
    ElCard,
  },
  props: {
    body: {
      type: [Array],
      required: true,
    },
    className: {
      type: String,
      required: false,
    },
    shadow: {
      type: String,
      required: false,
      options: ['always', 'hover', 'never'],
      default: 'always',
    },
    gutter: {
      type: Number,
      required: false,
      default: 0,
    },
    span: {
      type: Number,
      required: false,
      default: 12,
    },
  },
  mixins: [switches],
  computed: {
    isCards() {
      return Object.prototype.toString.call(this.body) === '[object Array]'
    },
  },
}
</script>
