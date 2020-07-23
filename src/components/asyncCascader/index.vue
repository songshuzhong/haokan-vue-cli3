<template>
  <div class="sc-async-cascader">
    <div class="sc-async-cascader__header">
      {{ title }}
    </div>
    <div class="sc-async-cascader__body">
      <div class="sc-async-cascader__main">
        <search-bar @search="onSearchBack" />
        <cascader-main />
      </div>
      <!--<sc-selection-viewer
        class="sc-async-cascader__selected"
        :max="max"
        :data="selectedData"
        :disabled="false"
        :multi-source="false"
        @clear="remove"
        @remove="remove"
      />-->
    </div>
    <div class="sc-async-cascader__foot">
      <el-button>确定</el-button>
    </div>
  </div>
</template>
<script>
import ElButton from 'element-ui/lib/button'
import CascaderMain from './main'
import SearchBar from './search'

import '~assets/styles/components/async-cascader.scss'

export default {
  name: 'SfcAsyncCascader',
  components: {
    ElButton,
    CascaderMain,
    SearchBar,
  },
  props: {
    max: {
      type: Number,
      required: false,
      default: 20,
    },
    title: {
      type: String,
      required: false,
      default: '选择广告计划',
    },
  },
  data() {
    return {
      selectedData: [],
    }
  },
  watch: {
    checkedIds(val) {
      const selectedData = []
      val.forEach(id => {
        !id.includes('all') &&
          selectedData.push({
            id,
            value: this.iOptions[id].name,
          })
      })
      this.selectedData = selectedData
    },
  },
  methods: {
    onSearchBack(checkedIds) {
      console.log(checkedIds)
    },
    remove(item) {
      if (!item) {
        this.trackIds = ['root']
        this.selectedData = []
        this.checkedIds = []
      } else {
        this.checkedIds = this.checkedIds.filter(id => id !== item.id)
      }
    },
  },
}
</script>
