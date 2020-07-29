const multiparty = require('multiparty')
const fse = require('fs-extra')
const path = require('path')

module.exports = {
    'POST /upload': async ctx => {
        const multiForm = new multiparty.Form()
        multiForm.parse(ctx.req, async(err, fields, files) => {
            const [chunk] = files.chunk
        })
    }
}
