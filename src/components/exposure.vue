<template>
  <el-form
    inline
    ref="exposureForm"
    class="sc-exposure"
    :model="formData"
    :show-message="false"
    @validate="onValidate"
  >
    <el-form-item prop="day" class="sc-exposure__form-item" :rules="rules.day">
      <el-input v-model="formData.day" size="small" />
    </el-form-item>
    <div class="sc-exposure__append">天</div>
    <el-form-item
      prop="rate"
      class="sc-exposure__form-item"
      :rules="rules.rate"
    >
      <el-input v-model="formData.rate" size="small" />
    </el-form-item>
    <div class="sc-exposure__append">次</div>
  </el-form>
</template>
<script>
import ElForm from 'element-ui/lib/form'
import ElInput from 'element-ui/lib/input'
import ElFormItem from 'element-ui/lib/form-item'

export default {
  name: 'ScExposure',
  components: {
    ElForm,
    ElInput,
    ElFormItem,
  },
  props: {
    error: {
      type: Object,
      required: false,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    const self = this
    const onDayValidator = function(rule, value, cb) {
      if (!/^([1-9]|10)$/.test(value)) {
        cb(new Error('天数在[1-10]天之间'))
      } else if (self.formData.rate - value > 0) {
        cb(new Error('天数大于等于曝光频次'))
      } else {
        cb()
      }
    }

    return {
      popMsg: '',
      formData: {
        day: '',
        rate: '',
      },
      rules: {
        day: [
          {
            validator: onDayValidator,
            trigger: 'blur',
          },
        ],
        rate: [
          {
            validator: onDayValidator,
            trigger: 'blur',
          },
        ],
      },
    }
  },
  watch: {
    value: {
      handler(val) {
        this.formData.day = String(val.time_interval)
        this.formData.rate = String(val.limit)
      },
    },
    formData: {
      handler(val) {
        this.$emit('input', { time_interval: val.day, limit: val.rate })
      },
      immediate: true,
      deep: true,
    },
    popMsg(val) {
      this.$emit('update:error', val)
    },
    error: {
      handler(val) {
        if (!val) {
          this.$refs['exposureForm'].clearValidate()
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    onValidate(field, state, msg) {
      this.popMsg = msg
    },
  },
}
</script>
<style lang="scss">
.sc-exposure {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
}
.sc-exposure__form-item {
  margin-bottom: 0;
}
.sc-exposure__append {
  padding: 0 10px;
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #39434e;
}
</style>
