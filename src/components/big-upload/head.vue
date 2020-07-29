<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <el-button @click="handleUpload">上传</el-button>
  </div>
</template>
<script>
import ElButton from 'element-ui/lib/button'

export default {
  name: 'Uploader',
  components: {
    ElButton,
  },
  data: () => ({
    file: null,
  }),
  methods: {
    handleFileChange(e) {
      const [file] = e.target.files
      if (!file) return null

      this.file = file
    },
    createChunkFile(file, size = 10 * 1024 * 1024) {
      const chunkFileList = []
      let cur = 0
      while (cur < file.size) {
        const chunk = file.slice(cur, cur + size)
        chunkFileList.push(chunk)
        cur += size
      }

      return chunkFileList
    },
    async mergeRequest() {
      await this.$http(`/merge/${this.file.name}`, 'get', '', {
        'content-type': 'application/json',
      })
    },
    async handleUpload() {
      if (!this.file) {
        this.$notice({
          type: 'error',
          title: '请先选择文件',
        })
      }
      let chunkFiles = this.createChunkFile(this.file)
      chunkFiles = chunkFiles.map((chunk, index) => ({
        chunk,
        hash: this.file.name + '-' + index,
      }))

      try {
        await this.onUploading(chunkFiles)
      } catch (e) {
        console.error(e)
        this.$notice({
          type: 'error',
          title: e.toString(),
        })
      }
    },
    async onUploading(chunkFiles) {
      const promises = chunkFiles
        .map(file => {
          const formData = new FormData()
          formData.append('hash', file.hash)
          formData.append('chunk', file.chunk)
          formData.append('name', this.file.name)
          return formData
        })
        .map(async data => {
          return this.$http(
            'http://dev.bendi.ad.weibo.com:3000/api/upload',
            'post',
            data
          )
        })

      await Promise.all(promises).finally(() => (this.file = null))
    },
  },
}
</script>
