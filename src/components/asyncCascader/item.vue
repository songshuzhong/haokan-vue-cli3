<template>
  <div>
    <div class="sc-async-cascader__main__cascader__header">
      计划系列
    </div>
    <div
      v-if="trunkId !== 'root'"
      :key="`all-${trunkId}`"
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
      :key="trunkId"
      v-model="checkedIds"
      @change="onGroupChange"
    >
      <template v-for="option in leaves.children">
        <div
          :key="option.id"
          :class="isActive(option.id)"
          @click="onChecked(option)"
          class="sc-async-cascader__main__cascader__item"
        >
          <el-checkbox :label="option.id" @change="onChanged">
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
    index: {
      type: [String, Number],
      required: true,
    },
    leaves: {
      type: Object,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
    trunkId: {
      type: [String, Number],
      required: false,
    },
  },
  data() {
    return {
      trunkIds: [],
      selectedIds: [],
      checkedIds: [],
      checkAll: false,
      isIndeterminate: true,
    }
  },
  watch: {
    value: {
      handler(val) {
        this.trunkIds = val
      },
      immediate: true,
    },
  },
  methods: {
    isActive(index) {
      return this.trunkIds.includes(String(index)) ? 'active' : ''
    },
    onGroupChange(value) {
      const boxes = this.leaves.children.length
      this.checkAll = value.length === boxes
      this.isIndeterminate = value.length > 0 && value.length < boxes
    },
    onChanged(isChecked, event) {
      const id = event.target.defaultValue
      const value = event.target.labels[0].innerText

      this.$emit('updateCheckedIds', isChecked, { id, value })
    },
    onChecked(option) {
      this.$emit('getMoreLeaves', this.index, option.id, option.children)
    },
    onAllChecked(val) {
      const checkedIds = []
      const selectedIds = []

      this.leaves.children.map(option => {
        checkedIds.push(option.id)
        selectedIds.push({
          id: option.id,
          value: option.name,
        })
      })

      if (val) {
        this.checkedIds = checkedIds
        this.$emit('updateCheckedIds', true, selectedIds)
      } else {
        this.checkedIds = []
        this.$emit('updateCheckedIds', false, selectedIds)
      }
      this.isIndeterminate = false
    },
  },
}
</script>
