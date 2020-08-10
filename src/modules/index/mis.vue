<template>
  <div class="mis-form">
    <template v-for="(field, index) in json">
      <mis-field :key="field.type + index" :field="field" />
    </template>
  </div>
</template>
<script>
import Vue from 'vue'

export default {
  name: 'MIS',
  data: () => ({
    eventHub: new Vue(),
    store: {},
    json: [
      {
        type: 'mis-input',
        name: 'input',
        props: {
          placeholder: '请选择日期',
          'suffix-icon': 'el-icon-date',
        },
        visibleOn: 'switchs == true',
      },
      {
        type: 'mis-select',
        name: 'select',
        disabledOn: 'switchs == true',
        props: {
          multiple: true,
          options: [
            {
              value: '选项1',
              label: '黄金糕',
            },
            {
              value: '选项2',
              label: '双皮奶',
            },
            {
              value: '选项3',
              label: '蚵仔煎',
            },
          ],
        },
      },
      {
        type: 'mis-checkbox',
        name: 'checkbox',
        props: {
          options: [
            {
              value: '1',
              label: '龙须面',
            },
            {
              value: '2',
              label: '北京烤鸭',
            },
          ],
        },
      },
      {
        type: 'mis-radio',
        name: 'radio',
        api: 'http://dev.bendi.ad.weibo.com:3000/api/list/12/500',
        props: {
          options: [
            {
              value: '1',
              label: '龙须面',
            },
            {
              value: '2',
              label: '北京烤鸭',
            },
          ],
        },
      },
      {
        type: 'mis-switch',
        name: 'switchs',
      },
    ],
  }),
  provide() {
    return {
      eventHub: this.eventHub,
    }
  },
  created() {
    this.eventHub.$on('mis-field:change', this.onFieldChange)
    this.eventHub.$on('mis-field:delete', this.onFieldDelete)
  },
  methods: {
    onFieldChange(name, value) {
      this.store[name] = value
      this.eventHub.$emit('mis-store:change', this.store)
    },
    onFieldDelete(name) {
      delete this.store[name]
      this.eventHub.$emit('mis-store:change', this.store)
    },
  },
}
</script>
