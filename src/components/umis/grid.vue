<template>
  <el-row
    v-if="iVisible"
    :gutter="gutter"
    :type="type"
    :justify="justify"
    :align="align"
    :tag="tag"
  >
    <el-col v-for="(item, index) in body" :span="item.span">
      <component
        :is="item.renderer"
        :key="index"
        :label="item.label"
        :name="item.name"
        :body="item.body"
      />
    </el-col>
  </el-row>
</template>
<script>
import ElRow from 'element-ui/lib/row'
import ElCol from 'element-ui/lib/col'

import switches from '~components/umis/switches'

export default {
  name: 'MisGrid',
  components: {
    ElRow,
    ElCol,
  },
  props: {
    body: {
      type: [Array, Object],
      required: false,
    },
    gutter: {
      type: Number,
      required: false,
      default: 0,
    },
    type: {
      type: String,
      required: false,
    },
    justify: {
      type: String,
      required: false,
      options: ['start', 'end', 'center', 'space-around', 'space-between'],
      default: 'start',
    },
    align: {
      type: String,
      required: false,
      options: ['top', 'middle', 'bottom'],
      default: 'top',
    },
    tag: {
      type: String,
      required: false,
      default: 'div',
    },
  },
  mixins: [switches],
}
</script>
