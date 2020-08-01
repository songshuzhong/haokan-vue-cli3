<template>
  <div class="sc-search-select">
    <el-input
      v-model="selectedItem.name"
      class="sc-search-select__input"
      suffix-icon="el-icon-arrow-down"
      placeholder="请输入内容"
      clearable
      @focus="onFocus"
    />
    <search-panel
      :show.sync="showPanel"
      :size="size"
      :search-url="searchUrl"
      :search-params="searchParams"
      @selected="onSelected"
    />
  </div>
</template>
<script>
import ElInput from 'element-ui/lib/input'
import SearchPanel from './search-panel'

import '~assets/styles/components/search-select.scss'

export default {
  name: 'ScSearchSelect',
  components: {
    ElInput,
    SearchPanel
  },
  props: {
    size: {
      type: Number,
      require: false
    },
    searchUrl: {
      type: String,
      require: true
    },
    searchParams: {
      type: Object,
      require: false
    }
  },
  data: () => ({
    showPanel: false,
    selectedItem: {}
  }),
  methods: {
    onFocus() {
      this.showPanel = true
    },
    onSelected(selectedItem) {
      this.$emit('input', selectedItem)
      this.selectedItem = selectedItem
    }
  },
}
</script>
