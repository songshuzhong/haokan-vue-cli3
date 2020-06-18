const path = require('path');
const staticCache = require('koa-static-cache');

module.exports = withStatic = (server) => {
    server.use(staticCache(path.resolve(__dirname, '../../../dist'), {maxAge: 0, gzip: true}))
}
