export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    visibleOn: {
      type: String,
      required: false,
    },
    disabledOn: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      iValue: '',
      iVisible: true,
      iDisabled: false,
    }
  },
  watch: {
    iVisible: {
      handler(val) {
        if (!val) {
          this.iValue = ''
          this.$eventHub.$emit('mis-field:delete', this.name)
        } else {
          this.$eventHub.$emit('mis-field:change', this.name, this.iValue)
        }
      },
    },
    iDisabled: {
      handler(val) {
        if (val) {
          this.iValue = ''
          this.$eventHub.$emit('mis-field:change', this.name, '')
        }
      },
    },
  },
  mounted() {
    this.$eventHub.$on('mis-store:change', this.onStoreChange)
  },
  methods: {
    onStoreChange(store) {
      this.store = store
      if (this.visibleOn) {
        this.iVisible = this.$onExpressionEval(this.visibleOn, this.store)
      }
      if (this.disabledOn) {
        this.iDisabled = this.$onExpressionEval(this.disabledOn, this.store)
      }
    },
  },
}
