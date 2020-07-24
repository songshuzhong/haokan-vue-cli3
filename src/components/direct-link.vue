<template>
  <div class="sc-direct-link">
    <el-input
      class="sc-direct-link__input"
      v-model="link"
      placeholder="请输入链接地址"
      clearable
    />
    <el-button
      class="sc-direct-link__button"
      v-loading="isLoading"
      @click="onValidator"
    >
      生成直达链接
    </el-button>
  </div>
</template>
<script>
import ElInput from 'element-ui/lib/input'
import ElButton from 'element-ui/lib/button'

export default {
  name: 'ScDirectLink',
  components: {
    ElInput,
    ElButton,
  },
  props: {
    value: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      link: '',
      isVerified: false,
      isLoading: false,
    }
  },
  watch: {
    value: {
      handler(val) {
        this.link = val
      },
      immediate: true,
    },
    isVerified: {
      handler(val) {
        if (val) {
          this.$emit('input', this.link)
        }
      },
      immediate: true,
    },
  },
  methods: {
    onValidator() {
      this.isLoading = true
      fetch('http://dev.bendi.ad.weibo.com:3000/api/list/1')
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
        .catch(error => console.warn(error))
        .finally(() => {
          this.isLoading = false
          this.isVerified = false
        })
    },
  },
}
</script>
<style lang="scss">
.sc-direct-link {
  display: flex;
}
.sc-direct-link__input {
}
.sc-direct-link__button {
  margin-left: 10px;
}
</style>
