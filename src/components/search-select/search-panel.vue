<template>
  <div
    v-show="isShow"
    class="sc-search-select__panel"
  >
    <div class="sc-search-select__panel__search">
      <el-input
        v-model="searchKey"
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        clearable
        @clear="onClear"
        @input="onChange"
      >
      </el-input>
    </div>
    <div
      ref="searchContainer"
      v-loading="result.length === 0 && isFetching"
      class="sc-search-select__panel__container"
    >
      <ul
        v-if="result.length"
        class="sc-search-select__panel__result"
      >
        <li
          v-for="(item, index) in result"
          :key="index"
          class="sc-search-select__panel__result__item"
          @click="onSelect(item)"
        >
          {{ item.name }}
        </li>
        <li
          v-if="result.length > 0 && isFetching"
          v-loading="isFetching"
          class="sc-search-select__panel__result__item"
        />
        <li
          v-if="!hasMore"
          class="sc-search-select__panel__result__no-more"
        >
          没有更多了
        </li>
      </ul>
      <div
        v-else
        class="sc-search-select__panel__empty"
      >
        无搜索结果，请尝试其它搜索词
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import ElInput from 'element-ui/lib/input'
import Loading from 'element-ui/lib/loading'
import { debounce } from 'debounce'

Vue.use(Loading)

export default {
  name: 'ScSearchPanel',
  components: {
    ElInput
  },
  props: {
    show: {
      type: Boolean,
      require: true
    },
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
    isShow: false,
    isFetching: false,
    hasMore: true,
    searchKey: '',
    result: [],
    pageIndex: 0,
    pageSize: 10
  }),
  watch: {
    show(val) {
      this.isShow = val
      if (val) {
        this.getMore()
      }
    },
    isShow(val) {
      this.$emit('update:show', val)
    },
    size(val) {
      this.pageSize = val
    },
    searchKey: {
      handler(val, old) {
        if (val !== old) {
          typeof this.source === 'function' &&
            this.source('CANCELED_DUE_TO_NEW_REQUEST')
          this.result = []
        }
      }
    }
  },
  mounted() {
    this.getDebounceScroller()
    this.$refs['searchContainer'].addEventListener('scroll', this.debounceScroller)
  },
  beforeDestroy() {
    this.$refs['searchContainer'].removeEventListener('scroll', this.debounceScroller)
  },
  methods: {
    getDebounceScroller() {
      this.debounceScroller = debounce(this.onScrolling, 500)
    },
    onClear() {
      this.isShow = false
      this.searchKey = ''
      this.result = []
    },
    onSelect(item) {
      this.isShow = false
      this.$emit('selected', item)
    },
    onChange: debounce(function () {
      this.getMore()
    }, 500),
    onScrolling() {
      const container = this.$refs['searchContainer']
      const clientHeight =
        container.clientHeight || container.clientHeight
      const scrollHeight =
        container.scrollHeight || container.scrollHeight
      const scrollTop =
        container.scrollTop || container.scrollTop
      const isBottom = scrollTop + clientHeight >= scrollHeight - 100
      if (isBottom && this.hasMore) {
        this.getMore()
      }
    },
    getMore() {
      this.isFetching = true
      this.$http(this.searchUrl, 'get', {
        name: this.searchKey,
        page: this.pageIndex,
        'page_size': this.pageSize,
        ...this.searchParams
      })
        .then(({data}) => {
          const result = data.result
          this.pageIndex += 1
          this.result = this.result.concat(result.list)
          this.hasMore = this.result.length < result.total
        }).finally(() => {
          this.isFetching = false
        })
    }
  }
}
</script>
