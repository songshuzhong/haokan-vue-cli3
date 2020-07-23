<template>
  <div>
    <div class="sc-async-cascader__main__cascader__header">
      计划系列
    </div>
    <div
      v-if="trackId !== 'root'"
      :key="`all-${trackId}`"
      class="sc-async-cascader__main__cascader__item"
    >
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="onAllChecked"
      >
        全选
      </el-checkbox>
    </div>
    <el-checkbox-group
      :key="trackId"
      v-model="checkedIds"
      @change="onGroupChange"
    >
      <template v-for="option in iOptions[trackId].children">
        <div
          :key="option.id"
          :class="isActive(option.id)"
          class="sc-async-cascader__main__cascader__item"
        >
          <el-checkbox :label="option.id" @change="onChecked(option)">
            {{ option.name }}
          </el-checkbox>
          <i
            v-if="option.children"
            class="el-icon-arrow-right sc-async-cascader__main__cascader__item--extend"
          />
        </div>
      </template>
    </el-checkbox-group>
  </div>
</template>
<script>
import ElCheckbox from 'element-ui/lib/checkbox'
import ElCheckboxGroup from 'element-ui/lib/checkbox-group'
import 'element-ui/lib/theme-chalk/index.css'
export default {
  name: 'AsyncCascaderItem',
  components: {
    ElCheckbox,
    ElCheckboxGroup,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    iOptions: {
      type: Object,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
    trackId: {
      type: [String, Number],
      required: false,
    },
    selectedIds: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      trackIds: [],
      checkedIds: [],
      checkAll: false,
      isIndeterminate: true,
    }
  },
  watch: {
    value: {
      handler(val) {
        this.trackIds = val
      },
      immediate: true,
    },
    checkedIds() {
      this.$emit('change', this.trackId, this.checkedIds)
    },
  },
  methods: {
    isActive(id) {
      return this.trackIds.includes(String(id)) ? 'active' : ''
    },
    onGroupChange(value) {
      const boxes = this.iOptions[this.trackId].children.length
      this.checkAll = value.length === boxes
      this.isIndeterminate = value.length > 0 && value.length < boxes
    },
    onChecked(option) {
      this.$emit('update', this.id, option.id)
    },
    onAllChecked(val) {
      if (val) {
        this.checkedIds = this.iOptions[this.trackId].children.map(
          option => option.id
        )
      } else {
        this.checkedIds = []
      }
      this.isIndeterminate = false
    },
  },
}
</script>
