<template>
  <fragment>
    <div
      v-if="isReady !== 'complete'"
      v-loading="isReady === 'loading'"
      class="sc-component-hoc"
    >
      <div
        v-if="isReady === 'error'"
        class="sc-component-hoc--error"
        @click="appendScript"
      >
        资源加载失败，请点击重新加载。
      </div>
      <div class="sc-component-hoc--loading" v-if="isReady === 'loading'">
        资源加载中......
      </div>
    </div>
    <bendibao-map
      v-on="$attrs"
      v-if="isReady === 'complete'"
      v-model="mapTreasure"
    />
  </fragment>
</template>
<script>
import BendibaoMap from 'wb-superfans-components/dist/lib/bendibaoMap'
import 'wb-superfans-components/dist/css/index.css'
export default {
  name: 'AsyncHoc',
  components: {
    BendibaoMap,
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
    anchor: {
      type: Object,
      required: false,
    },
    store: {
      type: Object,
      required: false,
    },
    origin: {
      type: String,
      required: true,
    },
    isListShow: {
      type: Boolean,
      required: false,
      default: true,
    },
    width: {
      type: Number,
      required: false,
      default: 800,
    },
    height: {
      type: Number,
      required: false,
      default: 800,
    },
    max: {
      type: Number,
      required: false,
      default: 30,
    },
    assets: {
      type: Object,
      required: false,
      default: () => ({
        scripts: [
          'https://webapi.amap.com/maps?v=1.4.14&key=c31c9448815b09442127d03247a5a4e2&plugin=AMap.Geocoder,AMap.Autocomplete,AMap.PlaceSearch,AMap.DistrictSearch',
          '//webapi.amap.com/ui/1.0/main.js?v=1.0.11',
        ],
        links: ['https://cache.amap.com/lbs/static/main1119.css'],
      }),
    },
  },
  data() {
    return {
      mapTreasure: [],
      isReady: 'loading',
      status: ['loading', 'complete', 'error'],
      promises: [],
      scriptStatus: [],
      scriptIds: [],
    }
  },
  watch: {
    mapTreasure: {
      handler(val) {
        this.$emit('input', val)
      },
      immediate: true,
    },
  },
  created() {
    this.assets.scripts.forEach(
      (script, index) => (this.scriptStatus[index] = false)
    )
  },
  mounted() {
    window.requestIdleCallback(this.appendScript)
  },
  methods: {
    appendScript() {
      const self = this
      this.assets.links.forEach(function(href) {
        const link = document.createElement('link')
        link.href = href
        link.type = 'stylesheet'
        document.head.appendChild(link)
      })

      for (let index = 0; index < this.assets.scripts.length; index++) {
        if (!this.scriptStatus[index]) {
          const src = this.assets.scripts[index]
          const script = document.createElement('script')
          const timestamp = new Date().getTime()

          script.id = timestamp
          script.src = src

          this.scriptIds.push(timestamp)
          this.promises.push(
            new Promise(function(resolve, reject) {
              script.onload = script.onreadystatechange = function() {
                if (
                  !this.readyState ||
                  this.readyState === 'load' ||
                  this.readyState === 'complete'
                ) {
                  self.scriptStatus[index] = true
                  resolve()
                } else {
                  self.scriptStatus[index] = false
                  reject()
                }

                script.onload = script.onreadystatechange = null
                script.onerror = function() {
                  reject()
                }
              }
            })
          )
          document.body.appendChild(script)
        }
      }

      Promise.all(this.promises)
        .then(() => {
          this.isReady = this.status[1]
        })
        .catch(error => {
          this.scriptIds.forEach((id, index) => {
            if (!this.scriptStatus[index]) {
              document.body.removeChild(document.getElementById(id))
            }
          })
          this.scriptIds = []
          this.isReady = this.status[2]
        })
    },
  },
}
</script>
<style lang="scss">
.sc-component-hoc {
  position: relative;
  height: 360px;
  text-align: center;
}
.sc-component-hoc--loading,
.sc-component-hoc--error {
  line-height: 34px;
  text-align: center;
  font-size: 12px;
  color: #969faa;
  cursor: pointer;
}
</style>
