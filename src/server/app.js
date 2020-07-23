const Koa = require('koa')
const Router = require('koa-router')

const withParser = require('./plugins/withParser')
const withRestify = require('./plugins/withRestify')
const withApiObserver = require('./plugins/withApiObserver')
const withRender = require('./plugins/withRender')
const withStatic = require('./plugins/withStatic')
const withAllowCross = require('./plugins/withAllowCross')

const server = new Koa()
const router = new Router()

withParser(server)
withAllowCross(server)
withRestify(server)
withApiObserver(server, router)
withRender(server)
withStatic(server)

const port = 3000

server.listen(port, err => {
  if (err) throw err
  console.log(`🚀 Server ready at http://localhost:${port}`)
})
