<template>
  <div class="hk-big-upload" v-loading="isMerging">
    <div class="hk-big-upload__head">
      <input type="file" @change="onFileChange" />
      <el-button @click="onUploading">上传</el-button>
      <el-button @click="onPause">暂停</el-button>
      <el-button @click="onResume">恢复</el-button>
      <el-button @click="onDelete">删除</el-button>
      <el-button @click="sendMergeRequest">合并</el-button>
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
    <div class="hk-big-upload__foot">
      <div class="hk-big-upload__foot__item">
        <div>总进度</div>
        <el-progress :percentage="fakeUploadPercentAge" />
      </div>
      <div class="hk-big-upload__foot__item">
        <div>MD5生成进度</div>
        <el-progress :percentage="mdPercentAge" />
      </div>
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
    isMerging: false,
    file: null,
    mdHash: '',
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
    },
    onResume() {},
    onDelete() {},
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
      ).then(({data}) => {
        if (data.msg === '上传成功') {
          this.fakeUploadPercentAge = 100
          this.chunkFiles.forEach(item => item.percentAge = 100)
          this.$notice({
            type: 'success',
            title: '通知',
            message: data.msg
          })
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
        this.mdHash = await this.createMDHash()
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
        .map(async (data, index) => {
          return this.$http(
              'http://dev.bendi.ad.weibo.com:3000/api/upload',
              'post',
              data,
              {},
              this.createProgressor(this.chunkFiles[index]),
              this.requestList
          )
        })

      await Promise.all(promises)
        .then(async () => {
          this.isMerging = true
          await this.sendMergeRequest()
          this.isMerging = false
        })
    },
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
.hk-big-upload__head,
.hk-big-upload__foot {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  .hk-big-upload__foot__item {
    flex: 1;
  }
}
.hk-big-upload__body {
  position: relative;
  width: 100%;
}
</style>
