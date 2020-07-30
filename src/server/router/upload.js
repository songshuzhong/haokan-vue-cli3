const fse = require('fs-extra')
const path = require('path')

const UPLOAD_DIR = path.resolve(__dirname, './../cache')
const DIST_DIR = path.resolve(__dirname, './../cache/dist')
const getFileName = filename => filename.replace(/(.*\/)*([^.]+).*/gi, '$2')

module.exports = {
    'GET /api/verify/:filehash': async ctx => {
        const filehash = ctx.params.filehash
        const fileDir = path.resolve(UPLOAD_DIR, filehash)
        if (fse.existsSync(fileDir)) {
            ctx.restify({status: 200, msg: '上传成功'})
        } else {
            ctx.restify({status: 200, msg: '允许上传'})
        }
    },
    'POST /api/merge': async ctx => {
        const {name, chunkSize, filehash} = ctx.request.body
        const chunkDir = path.resolve(UPLOAD_DIR, filehash)
        let chunks = await fse.readdir(chunkDir)

        chunks.sort((a, b) => a.split('-')[1] - b.split('-')[1])

        try {
            await Promise.all(chunks.map((chunk, index) => {
                return new Promise((resolve, reject) => {
                    const filePath = path.resolve(chunkDir, chunk)
                    const readStream = fse.createReadStream(filePath)
                    readStream.on('end', () => {
                        fse.unlinkSync(filePath)
                        resolve()
                    })
                    readStream.pipe(
                        fse.createWriteStream(path.resolve(DIST_DIR, name), {
                            start: index * chunkSize,
                            end: (index + 1) * chunkSize
                        })
                    )
                })
            })).then(() => {
                fse.rmdir(chunkDir)
            })
        } catch (e) {
            ctx.restify({status: 200, msg: e})
        }
        ctx.restify({status: 200, msg: 'success'})
    },
    'POST /api/upload': async ctx => {
        const {filehash, index} = ctx.request.body
        const {chunk} = ctx.request.files
        const fileDir = path.resolve(UPLOAD_DIR, filehash)
        const hashname = `${filehash}_${index}`

        try {
            if (!fse.existsSync(fileDir)) {
                await fse.mkdirs(fileDir)
            }
            await fse.move(chunk.path, path.resolve(fileDir, hashname))
        } catch (e) {
            console.log(e)
        } finally {
            ctx.restify({status: 200, msg: 'received file chunk'})
        }
    }
}
