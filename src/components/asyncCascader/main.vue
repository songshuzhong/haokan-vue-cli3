<template>
  <div class="sc-async-cascader__main__cascaders" v-loading="isLoading">
    <div
      v-for="(trackId, key) in trackIds"
      :key="key"
      class="sc-async-cascader__main__cascader"
    >
      <async-item
        :key="trackId"
        v-model="trackIds"
        :id="key"
        :track-id="trackId"
        :i-options="iOptions"
        :selected-ids="checkedIds[trackId]"
        @update="update"
        @change="updateCheckedIds"
      />
    </div>
  </div>
</template>

<script>
import ElCheckbox from 'element-ui/lib/checkbox'
import ElCheckboxGroup from 'element-ui/lib/checkbox-group'
import AsyncItem from './item'

export default {
  name: 'Main',
  components: {
    ElCheckbox,
    ElCheckboxGroup,
    AsyncItem,
  },
  data() {
    return {
      isLoading: false,
      selectedData: [],
      trackIds: ['root'],
      checkedIds: {
        root: [],
      },
      iOptions: {
        root: {
          children: [],
        },
      },
      initial: false,
    }
  },
  mounted() {
    this.fetchLists('root')
  },
  methods: {
    updateCheckedIds(trackId, checkedIds) {
      this.checkedIds[trackId] = checkedIds
    },
    update(id, trackId) {
      this.fetchLists(trackId).then(() => {
        if (
          this.trackIds.length - 1 === id &&
          this.iOptions[String(trackId)] &&
          this.iOptions[String(trackId)].children
        ) {
          this.trackIds.push(trackId)
        } else if (id < this.trackIds.length - 1) {
          this.trackIds.splice(id + 1, this.trackIds.length, trackId)
        }
      })
    },
    flat(options, trackId) {
      options.forEach(option => {
        const key = String(option.id)

        if (!this.initial) {
          this.iOptions.root.children.push(option)
          this.initial = true
        } else {
          this.iOptions[trackId].children = options
        }
        !this.initial && this.iOptions.root.children.push(option)
        !this.iOptions[key] && (this.iOptions[key] = option)
      })

      !this.initial && options.length && (this.initial = true)
    },
    fetchLists(trackId) {
      if (
        this.iOptions[String(trackId)] &&
        this.iOptions[String(trackId)].children &&
        this.iOptions[String(trackId)].children.length === 0
      ) {
        this.isLoading = true
        return fetch(`http://dev.bendi.ad.weibo.com:3000/api/list/${trackId}`)
          .then(res => res.json())
          .then(options => {
            options.forEach(option => (this.checkedIds[String(option.id)] = []))
            this.flat(options, trackId)
          })
          .catch(err => console.log(err))
          .finally(() => {
            this.isLoading = false
          })
      } else {
        return Promise.resolve()
      }
    },
  },
}
</script>
