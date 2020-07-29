<template>
  <fragment>
    <div class="sc-async-cascader__main__cascader__header">
      {{ categories[index] }}
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
      class="sc-async-cascader__main__cascader__group"
      :class="index === 0 ? 'taller' : ''"
      @change="onGroupChange"
    >
      <template v-for="option in leaves.children">
        <div
          :key="option.id"
          :class="isActive(option.id)"
          @click="onChecked(option)"
          class="sc-async-cascader__main__cascader__item"
        >
          <el-checkbox
            :label="option.id"
            :disabled="absence <= 0"
            @change="onChanged"
          >
            {{ option.name }}
          </el-checkbox>
          <i
            v-if="option.children"
            class="el-icon-arrow-right sc-async-cascader__main__cascader__item--extend"
          />
        </div>
      </template>
    </el-checkbox-group>
  </fragment>
</template>
<script>
import notification from 'element-ui/lib/notification'
import ElCheckbox from 'element-ui/lib/checkbox'
import ElCheckboxGroup from 'element-ui/lib/checkbox-group'
import 'element-ui/lib/theme-chalk/index.css'

export default {
  name: 'Item',
  components: {
    ElCheckbox,
    ElCheckboxGroup,
  },
  props: {
    absence: {
      type: Number,
      required: true,
    },
    categories: {
      type: Object,
      required: true,
    },
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
      checkedIds: [],
      checkAll: false,
      isIndeterminate: true,
    }
  },
  inject: ['eventHub'],
  watch: {
    value: {
      handler(val) {
        this.trunkIds = val
      },
      immediate: true,
    },
  },
  created() {
    this.eventHub.$on('sc-async-cascader:change', this.onListener)
  },
  beforeDestroy() {
    this.eventHub.$off('sc-async-cascader:change', this.onListener)
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
      const absence = this.leaves.children.length - this.checkedIds.length

      if (absence > this.absence) {
        notification({
          title: '警告',
          message: `您还剩 ${this.absence} 个位置可以选择！`,
          type: 'warning',
          dangerouslyUseHTMLString: true,
        })
        return
      }
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
    onListener(detail) {
      if (detail) {
        this.checkedIds = this.checkedIds.filter(id => id !== detail.id)
        this.isIndeterminate = true
      } else {
        this.checkedIds = []
        this.checkAll = false
      }
    },
  },
}
</script>
