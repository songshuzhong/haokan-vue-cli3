<template>
  <div class="sc-async-cascader__main__search">
    <el-input
      v-model="searchKey"
      clearable
      :placeholder="'请输入关键词'"
      :validate-event="false"
      @keyup.enter.native="search"
    >
      <el-select slot="prepend" v-model="category" placeholder="请选择">
        <el-option
          v-for="(label, key) in categories"
          :key="label"
          :label="label"
          :value="key"
        />
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="search" />
    </el-input>
    <div
      v-if="isShow"
      v-loading="isLoading"
      class="sc-async-cascader__main__search__result"
    >
      <el-checkbox-group v-model="checkedIds" v-if="searchResult.length">
        <div
          v-for="option in searchResult"
          class="sc-async-cascader__main__cascader__item"
        >
          <el-checkbox
            :label="option.id"
            @change="onChanged"
            :checked="hasChecked(option.id)"
          >
            {{ option.name }}
          </el-checkbox>
        </div>
      </el-checkbox-group>
      <div class="sc-async-cascader__main__search__empty" v-else>
        无搜索结果，请尝试其它搜索词
      </div>
    </div>
  </div>
</template>
<script>
import ElButton from 'element-ui/lib/button'
import ElInput from 'element-ui/lib/input'
import ElSelect from 'element-ui/lib/select'
import ElOption from 'element-ui/lib/option'
import ElCheckbox from 'element-ui/lib/checkbox'
import ElCheckboxGroup from 'element-ui/lib/checkbox-group'

export default {
  name: 'SearchBar',
  components: {
    ElButton,
    ElInput,
    ElSelect,
    ElOption,
    ElCheckbox,
    ElCheckboxGroup,
  },
  props: {
    data: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      checkedIds: [],
      isLoading: false,
      isShow: false,
      searchKey: '',
      searchResult: [],
      category: '1',
      categories: {
        '1': '餐厅号',
        '2': '订单号',
        '3': '用户ID',
      },
    }
  },
  computed: {
    checkedKeys() {
      return this.data.map(item => item.id)
    },
  },
  watch: {
    searchKey: {
      handler(val) {
        if (val.length === 0) {
          this.isShow = false
        }
      },
      immediate: true,
    },
  },
  methods: {
    hasChecked(checkedId) {
      return this.checkedKeys.includes(checkedId)
    },
    onChanged(isChecked, event) {
      const id = event.target.defaultValue
      const value = event.target.labels[0].innerText

      this.$emit('updateCheckedIds', isChecked, { id, value })
    },
    search() {
      this.isShow = true
      this.isLoading = true
      fetch('http://dev.bendi.ad.weibo.com:3000/api/list/root1')
        .then(res => res.json())
        .then(data => {
          this.searchResult = data
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}
</script>
