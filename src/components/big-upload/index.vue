<template>
  <div class="hk-big-upload" v-loading="isMerging">
    <div class="hk-big-upload__head">
      <div class="hk-big-upload__tool">
        <input class="hk-big-upload__head__input" type="file" @change="onFileChange" />
        <el-button @click="onUploading">上传</el-button>
        <el-button @click="onPause">暂停</el-button>
        <el-button @click="onUploading">恢复</el-button>
        <el-button @click="onDelete">删除</el-button>
        <el-button @click="sendMergeRequest">合并</el-button>
      </div>
      <div class="hk-big-upload__tool">
        <div class="hk-big-upload__tool__item">
          <div class="hk-big-upload__tool__item__label">总进度</div>
          <el-progress :percentage="fakeUploadPercentAge" />
        </div>
        <div class="hk-big-upload__tool__item">
          <div class="hk-big-upload__tool__item__label">MD5生成进度</div>
          <el-progress :percentage="mdPercentAge" />
        </div>
      </div>
    </div>
    <div class="hk-big-upload__body">
      <el-table :data="chunkFiles">
        <el-table-column
            prop="hash"
            label="切片hash"
        />
        <el-table-column label="大小(KB)">
          <template v-slot="{ row }">
            {{ (row.size / 10240).toFixed(0) }}
          </template>
        </el-table-column>
        <el-table-column label="进度">
          <template v-slot="{ row }">
            <el-progress
                :percentage="row.percentAge"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import ElButton from 'element-ui/lib/button'
import ElTable from 'element-ui/lib/table'
import ElTableColumn from 'element-ui/lib/table-column'
import ElProgress from 'element-ui/lib/progress'

const SIZE = 10 * 1024 * 1024

export default {
  name: 'Uploader',
  components: {
    ElButton,
    ElTable,
    ElTableColumn,
    ElProgress
  },
  data: () => ({
    isPause: false,
    isMerging: false,
    file: null,
    mdHash: '',
    uploadedChunks: [],
    chunkFiles: [],
    requestList: [],
    fakeUploadPercentAge: 0,
    mdPercentAge: 0,
  }),
  computed: {
    uploadPercentage() {
      if (this.file) {
        const loaded = this.chunkFiles
          .map(chunk => chunk.size * chunk.percentAge)
          .reduce((acc, cur) => acc + cur, 0)

        return parseInt((loaded / this.file.size).toFixed(2))
      }
    }
  },
  watch: {
    uploadPercentage(val) {
      if (val > this.fakeUploadPercentAge) {
        this.fakeUploadPercentAge = val
      }
    }
  },
  mounted() {
    this.worker = new Worker('/hash.sw.js')
  },
  methods: {
    onFileChange(e) {
      const [file] = e.target.files
      if (!file) return null

      this.file = file
      this.chunkFiles = []
    },
    onPause() {
      this.requestList.forEach(xhr => xhr.abort())
      this.requestList = []
      this.isPause = true
    },
    onDelete() {
      this.$http(
          `http://dev.bendi.ad.weibo.com:3000/api/${this.mdHash}`,
          'delete',
      ).then(({data}) => {
        this.$notice({
          type: 'success',
          title: '通知',
          message: data.msg
        })
      })
    },
    createProgressor(item) {
      return e => {
        item.percentAge = parseInt(String(e.loaded / e.total) * 100)
      }
    },
    createMDHash() {
      return new Promise((resolve, reject) => {
        this.worker.postMessage({chunkFiles: this.chunkFiles})
        this.worker.onmessage = e => {
          const {percentAge, mdHash} = e.data
          if (percentAge === 100) {
            resolve(mdHash)
          }
          this.mdPercentAge = percentAge
        }
      })
    },
    createMDHashIdle() {
      return new Promise((resolve) => {
        const spark = new SparkMD5.ArrayBuffer()
        let count = 0
        const appendToSpark = chunk => {
          return new Promise(resolve => {
            const reader = new FileReader()
            reader.readAsArrayBuffer(chunk)
            reader.onload = e => {
              spark.append(e.target.result)
              resolve()
            }
          })
        }

        const loop = async deadline => {
          while(deadline.timeRemaining && count < this.chunkFiles.length) {
            await appendToSpark(this.chunkFiles[count].chunk)
            count++
            if (count < this.chunkFiles.length) {
              this.mdPercentAge = Math.round(count * 100 / this.chunkFiles.length)
            } else {
              this.mdPercentAge = 100
              resolve(spark.end())
            }
          }
          window.requestIdleCallback(loop)
        }

        window.requestIdleCallback(loop)
      })
    },
    createChunkFile(file, size = SIZE) {
      const chunkFileList = []
      let cur = 0
      while (cur < file.size) {
        const chunk = file.slice(cur, cur + size)
        chunkFileList.push(chunk)
        cur += size
      }

      return chunkFileList
    },
    sendMergeRequest() {
      this.$http(
        `http://dev.bendi.ad.weibo.com:3000/api/merge`,
        'post',
        JSON.stringify({
          name: this.file.name,
          chunkSize: SIZE,
          filehash: this.mdHash
        }),
        {
          'content-type': 'application/json'
        }
      )
    },
    beforeUploading() {
      return this.$http(
        `http://dev.bendi.ad.weibo.com:3000/api/verify/${this.mdHash}`,
        'get',
        {resume: this.isPause}
      ).then(({data}) => {
        if (data.msg === '继续上传') {
          return data.result
        } else if (data.msg === '上传成功') {
          this.fakeUploadPercentAge = 100
          this.chunkFiles.forEach(item => item.percentAge = 100)
          return false
        } else {
          return true
        }
      })
    },
    async onUploading() {
      if (!this.file) {
        this.$notice({
          type: 'error',
          title: '警告',
          message: '请先选择文件',
        })
      }
      const chunkFiles = this.createChunkFile(this.file)
      this.chunkFiles = chunkFiles.map((chunk, index) => ({
        index,
        chunk,
        size: chunk.size,
        hash: this.file.name + '-' + index,
        percentAge: 0
      }))

      try {
        this.mdHash = await this.createMDHashIdle()
        const avaliable = await this.beforeUploading()
        if (avaliable) {
          this.onChunkUploading(this.chunkFiles)
        }
      } catch (e) {
        console.error(e)
        this.$notice({
          type: 'error',
          title: '警告',
          message: e.toString(),
        })
      }
    },
    async onChunkUploading(chunkFiles) {
      const promises = chunkFiles
        .map((file, index) => {
          const formData = new FormData()
          formData.append('index', index)
          formData.append('hash', file.hash)
          formData.append('chunk', file.chunk)
          formData.append('name', this.file.name)
          formData.append('filehash', this.mdHash)
          return formData
        })
        .filter(async (data, index) => {
          if (!this.uploadedChunks.includes(data.get('chunk'))) {
            return data
            /*return this.$http(
                'http://dev.bendi.ad.weibo.com:3000/api/upload',
                'post',
                data,
                {},
                this.createProgressor(this.chunkFiles[index]),
                this.requestList
            )*/
          }
        })

      // await Promise.all(promises)
      await this.requestQueue(promises)
    },
    async requestQueue(forms, max = 4) {
      return new Promise((resolve, reject) => {
        let counter = 0
        const length = this.chunkFiles.length
        const next = () => {
          while (max > 0 && counter < length) {
            max--
            this.$http(
                'http://dev.bendi.ad.weibo.com:3000/api/upload',
                'post',
                forms[counter],
                {},
                this.createProgressor(this.chunkFiles[counter]),
                this.requestList
            ).then(() => {
              max++
              if (counter === length) {
                resolve()
              } else {
                next()
              }
            })
            counter++
          }
        }
        next()
      })
    },
    async requestQueue1(forms, max = 4) {
      return new Promise((resolve, reject) => {
        let count = 0
        const length = this.chunkFiles.length
        const start = () => {
          while (max > 0 && count < length) {
            max--
            const form = forms[count]
            this.$http(
                'http://dev.bendi.ad.weibo.com:3000/api/upload',
                'post',
                form,
                {},
                this.createProgressor(this.chunkFiles[count]),
                this.requestList
            ).then(() => {
              max++
              if (count === length) {
                resolve()
              } else {
                start()
              }
            })
            count++
          }
        }
        start()
      })
    }
  },
}
</script>
<style lang="scss">
.hk-big-upload {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: #dfe3e6;
}
.hk-big-upload__head__input {
  flex: 1;
}
.hk-big-upload__head {
  width: 100%;
}
.hk-big-upload__tool {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  .hk-big-upload__tool__item {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    .el-progress {
      width: 600px;
    }
  }
}
.hk-big-upload__tool__item__label {
  margin-right: 20px;
}
.hk-big-upload__body {
  position: relative;
  width: 100%;
}
</style>
