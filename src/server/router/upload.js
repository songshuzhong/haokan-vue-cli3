const fse = require('fs-extra')
const path = require('path')

const UPLOAD_DIR = path.resolve(__dirname, './../cache')
const DIST_DIR = path.resolve(__dirname, './../cache/dist')
const getFileName = filename => filename.replace(/(.*\/)*([^.]+).*/gi, '$2')
const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time))

module.exports = {
    'DELETE /api/:filehash': async ctx => {
        const filehash = ctx.params.filehash
        const fileDir = path.resolve(DIST_DIR, filehash)
        if (fse.existsSync(fileDir)) {
            try {
                fse.rmdir(fileDir)
                ctx.restify({status: 200, msg: '删除成功'})
            } catch (e) {
                ctx.restify({status: 200, msg: '删除失败'})
            }
        }
    },
    'GET /api/verify/:filehash': async ctx => {
        const filehash = ctx.params.filehash
        const {resume} = ctx.request.body
        const fileDir = path.resolve(UPLOAD_DIR, filehash)
        let chunks
        if (fse.existsSync(fileDir)) {
            if (resume) {
                chunks = await fse.readdir(fileDir)
                ctx.restify({status: 200, msg: '继续上传', result: chunks})
            } else {
                ctx.restify({status: 200, msg: '上传成功'})
            }
        } else {
            ctx.restify({status: 200, msg: '上传资源生成中，请稍等...'})
        }
    },
    'POST /api/merge': async ctx => {
        try {
            const {name, chunkSize, filehash} = ctx.request.body
            const chunkDir = path.resolve(UPLOAD_DIR, filehash)
            const fileDir = path.resolve(DIST_DIR, filehash)
            let chunks = await fse.readdir(chunkDir)

            chunks.sort((a, b) => a.split('-')[1] - b.split('-')[1])

            if (!fse.existsSync(fileDir)) {
                await fse.mkdirs(fileDir)
            }
            await Promise.all(chunks.map((chunk, index) => {
                return new Promise((resolve, reject) => {
                    const filePath = path.resolve(chunkDir, chunk)
                    const readStream = fse.createReadStream(filePath)
                    readStream.on('end', () => {
                        fse.unlinkSync(filePath)
                        resolve()
                    })
                    readStream.pipe(
                        fse.createWriteStream(path.resolve(fileDir, name), {
                            start: index * chunkSize,
                            end: (index + 1) * chunkSize
                        })
                    )
                })
            })).then(() => {
                fse.rmdir(chunkDir)
                ctx.restify({status: 200, msg: 'success'})
            })
        } catch (e) {
            console.log(e)
            ctx.restify({status: 200, msg: e})
        }
    },
    'POST /api/upload': async ctx => {
        const {filehash, index} = ctx.request.body
        const {chunk} = ctx.request.files
        const fileDir = path.resolve(UPLOAD_DIR, filehash)
        const hashname = `${filehash}_${index}`
        const t = index % 4
        try {
            if (!fse.existsSync(fileDir)) {
                await fse.mkdirs(fileDir)
            }
            await sleep(t * 1000)
            await fse.move(chunk.path, path.resolve(fileDir, hashname))
            ctx.restify({status: 200, msg: 'received file chunk'})
        } catch (e) {
            ctx.restify({status: 500, msg: e})
        }
    }
}
