<template>
  <div class="sc-selection-viewer">
    <div class="sc-selection-viewer__header">
      已选（<span
        :class="{
          'sc-selection-viewer__error': max > 0 && iValue.length > max,
        }"
        >{{ count }}</span
      >）
      <span
        class="sc-selection-viewer__clear"
        :class="{ disabled: disabled }"
        @click="clear"
      >
        清空
      </span>
      <!-- 多数据分类计数展示 -->
      <div
        v-if="multiSource && categoryShow"
        class="sc-selection-viewer__category-wrapper"
      >
        <span
          v-for="(name, source) in categoryNameList"
          :key="source"
          class="sc-selection-viewer__category"
        >
          {{ `${name}：${getSelectionCount(source)}` }}
        </span>
      </div>
    </div>
    <!-- 多数据分tab展示 -->
    <div v-if="multiSource && !categoryShow" class="sc-selection-viewer__tab">
      <el-tabs v-model="iActiveName">
        <el-tab-pane
          v-for="(options, source) in data"
          :key="source"
          :name="source"
        >
          <span slot="label">
            <span class="sc-selection-viewer__tab-name">
              {{ categoryNameList[source] }}
            </span>
            <span class="sc-selection-viewer__tab-count">
              ({{ data[source].length }})
            </span>
          </span>
          <el-tag
            v-for="item in options"
            :key="item.id"
            closable
            :class="{ 'sc-selection-viewer__tag-disabled': disabled }"
            @close="remove(Object.assign({}, item, { source: source }))"
          >
            <el-tooltip
              effect="dark"
              placement="bottom"
              :content="item.value"
              class="sc-selection-viewer__tag-text"
              popper-class="sc-selection-viewer__tag-popover"
            >
              <span
                @click="
                  handleClick(Object.assign({}, item, { source: source }))
                "
              >
                {{ item.value }}
                <slot
                  name="suffix"
                  v-bind="Object.assign({}, item, { source: source })"
                />
              </span>
            </el-tooltip>
          </el-tag>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 数据全部展示 -->
    <div
      v-if="!multiSource || (multiSource && categoryShow)"
      class="sc-selection-viewer__content"
    >
      <el-tag
        v-for="item in iValue"
        :key="item.id"
        closable
        :class="{ 'sc-selection-viewer__tag-disabled': disabled }"
        @close="remove(item)"
      >
        <el-tooltip
          effect="dark"
          placement="bottom"
          :content="item.value"
          class="sc-selection-viewer__tag-text"
          popper-class="sc-selection-viewer__tag-popover"
        >
          <span @click="handleClick(item)">
            {{ item.value }}
            <slot name="suffix" v-bind="item" />
          </span>
        </el-tooltip>
      </el-tag>
    </div>
  </div>
</template>
<script>
//已选项显示
import elTag from 'element-ui/lib/tag'
import elTabs from 'element-ui/lib/tabs'
import elTabPane from 'element-ui/lib/tab-pane'
import elTooltip from 'element-ui/lib/tooltip'
export default {
  name: 'ScSelectionViewer',
  components: {
    elTag,
    elTabs,
    elTabPane,
    elTooltip,
  },
  props: {
    // 单数据源：[{id: xxx, value: '显示文字'}]
    // 多数据源：{source1: [{id: xxx, value: '显示文字'}], source2: [{id: xxx, value: '显示文字'}]}
    data: {
      type: [Array, Object],
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    max: {
      type: Number,
      required: false,
      default: null,
    },
    // 多数据源
    multiSource: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 默认tab，多数据源必须参数
    activeName: {
      type: String,
      required: false,
    },
    // 多数据源的分类名称，多数据源必须参数
    categoryNameList: {
      type: Object,
      required: false,
      default() {
        return {}
      },
    },
    // 多数据源的仅展示分类数量
    categoryShow: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      iValue: [],
      iActiveName: this.activeName,
    }
  },
  computed: {
    count() {
      return this.max > 0
        ? `${this.iValue.length}/${this.max}`
        : this.iValue.length
    },
  },
  watch: {
    data: {
      handler: function(val) {
        this.iValue = this.multiSource ? this.formatMultiSourceData(val) : val
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getSelectionCount(source) {
      if (this.data[source] && this.data[source].length) {
        return this.data[source].length
      }
      return 0
    },
    remove(option) {
      if (this.disabled) {
        return
      }
      this.iValue = this.iValue.filter(item => item.id !== option.id)
      this.$emit('remove', {
        id: option.id,
        source: option.source ? option.source : '',
      })
    },
    clear() {
      !this.disabled && this.$emit('clear')
    },
    handleClick(option) {
      this.$emit('current-select', option)
    },
    formatMultiSourceData(data) {
      let formatedData = []
      for (let source in data) {
        if (data.hasOwnProperty(source)) {
          let itemData = data[source].map(option => {
            return {
              id: option.id,
              value: option.value,
              source: source,
            }
          })
          formatedData.push(...itemData)
        }
      }
      return formatedData
    },
  },
}
</script>
