<template>
  <div class="sc-async-cascader__main__cascaders" v-loading="isLoading">
    <div
      v-for="(trunkId, key) in trunkIds"
      :key="key"
      class="sc-async-cascader__main__cascader"
    >
      <async-item
        :key="trunkId"
        v-model="trunkIds"
        v-on="$listeners"
        v-bind="$attrs"
        :index="key"
        :trunk-id="trunkId"
        :leaves="findActiveTrunk(trunkId)"
        @getMoreLeaves="getMoreLeaves"
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
      tree: {
        id: 'root',
        name: 'root',
        children: [],
      },
      isLoading: false,
      trunkIds: ['root'],
    }
  },
  mounted() {
    this.onTrunkSprouting('root')
  },
  methods: {
    findActiveTrunk(trunkId) {
      let trunk = this.tree
      for (let i = 0; i < this.trunkIds.length; i++) {
        const pId = this.trunkIds[i]
        const cId = this.trunkIds[i + 1]
        if (trunkId === pId) {
          break
        } else {
          trunk = trunk.children.find(child => child.id === cId)
        }
      }
      return trunk
    },
    updateActiveTrunk(trunkId, leaves) {
      const activeTrunk = this.findActiveTrunk(trunkId)

      activeTrunk.children = leaves
    },
    getMoreLeaves(id, trunkId, hasChild) {
      if (this.trunkIds.length - 1 === id && hasChild) {
        this.trunkIds.push(trunkId)
      } else if (id < this.trunkIds.length - 1) {
        this.trunkIds.splice(id + 1, this.trunkIds.length, trunkId)
      }
      this.onTrunkSprouting(trunkId).then(options => {
        if (options) {
          this.updateActiveTrunk(trunkId, options)
        }
      })
    },
    onTrunkSprouting(trunkId) {
      const activeTrunk = this.findActiveTrunk(trunkId)
      if (
        activeTrunk &&
        activeTrunk.children &&
        activeTrunk.children.length === 0
      ) {
        this.isLoading = true
        return fetch(`http://dev.bendi.ad.weibo.com:3000/api/list/${trunkId}`)
          .then(res => res.json())
          .then(options => {
            if (trunkId === 'root') {
              this.tree.children = options
            }
            return options
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
