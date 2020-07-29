<template>
  <div class="sc-async-cascader">
    <div class="sc-async-cascader__header">
      {{ title }}
    </div>
    <div class="sc-async-cascader__body">
      <div class="sc-async-cascader__main">
        <search-bar
          @updateCheckedIds="updateCheckedIds"
          :data="selectedData"
          :absence="absence"
          :categories="categories"
        />
        <cascader-main
          @updateCheckedIds="updateCheckedIds"
          :absence="absence"
          :categories="categories"
        />
      </div>
      <sc-selection-viewer
        class="sc-async-cascader__selected"
        :max="max"
        :data="selectedData"
        :disabled="false"
        :multi-source="false"
        @clear="remove"
        @remove="remove"
      />
    </div>
    <div class="sc-async-cascader__foot">
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" plain @click="onSure">
        确定
      </el-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import ElButton from 'element-ui/lib/button'
import CascaderMain from './main'
import SearchBar from './search'
import ScSelectionViewer from 'wb-superfans-components/dist/lib/selectionViewer'

import '~assets/styles/components/async-cascader.scss'
import '~assets/styles/components/viewer.css'

export default {
  name: 'SfcAsyncCascader',
  components: {
    ElButton,
    CascaderMain,
    SearchBar,
    ScSelectionViewer,
  },
  props: {
    max: {
      type: Number,
      required: false,
      default: 10,
    },
    title: {
      type: String,
      required: false,
      default: '选择广告计划',
    },
    cancel: {
      type: Function,
      required: false,
    },
    ok: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      eventHub: new Vue(),
      selectedData: [],
      categories: {
        0: '广告系列',
        1: '广告计划',
        2: '广告创意',
      },
    }
  },
  provide() {
    return {
      eventHub: this.eventHub,
    }
  },
  computed: {
    absence() {
      return this.max - this.selectedData.length
    },
  },
  methods: {
    joinOnUnique(arr1, arr2, hash = {}) {
      const combine = arr1.concat(arr2)
      return combine.reduce((item, next) => {
        if (!hash[next.id]) {
          hash[next.id] = true
          item.push(next)
        }
        return item
      }, [])
    },
    updateCheckedIds(isChecked, ids) {
      const isArray = Object.prototype.toString.call(ids) === '[object Array]'

      if (isArray) {
        if (isChecked) {
          this.selectedData = this.joinOnUnique(this.selectedData, ids)
        } else {
          ids = ids.map(item => item.id)
          this.selectedData = this.selectedData.filter(
            item => ids.indexOf(item.id) === -1
          )
        }
      } else {
        if (isChecked) {
          this.selectedData.push(ids)
        } else {
          this.selectedData = this.selectedData.filter(
            item => item.id !== ids.id
          )
        }
      }
    },
    remove(ids) {
      if (ids) {
        this.selectedData = this.selectedData.filter(item => item.id !== ids.id)
      } else {
        this.selectedData = []
      }
      this.eventHub.$emit('sc-async-cascader:change', ids)
    },
    onCancel() {
      this.cancel && this.cancel()
    },
    onSure() {
      this.ok && this.ok(this.selectedData)
    },
  },
}
</script>
