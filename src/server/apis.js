const path = require('path')
const multiparty = require('multiparty')
const fse = require('fs-extra')

const UPLOAD_DIR = path.resolve(__dirname, './../cache')
const extractExt = filename =>
  filename.slice(filename.lastIndexOf('.'), filename.length)

module.exports = {
  async handlerFormData(req, res) {
    let multiForm
    try {
      multiForm = new multiparty.Form()
    } catch (e) {
      console.error(e)
    }

    multiForm.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err)
        res.status = 500
        res.end('process file chunk failed')
        return
      }
      const [chunk] = files.chunk
      const [hash] = fields.hash
      const [name] = fields.name
      const filePath = path.resolve(
        UPLOAD_DIR,
        `${hash}${extractExt(name)}`
      )
      const chunkDir = path.resolve(UPLOAD_DIR, hash)

      if (fse.existsSync(filePath)) {
        res.end('file exist')
        return
      }

      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir)
      }
      try {
        await fse.move(chunk.path, path.resolve(chunkDir, hash))
      } catch (e) {
        console.log(e)
      } finally {
        res.end('received file chunk')
      }
    })
  },
}
