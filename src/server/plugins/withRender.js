const path = require('path');
const render = require('koa-ejs');

module.exports = withRender = (server) => {
    render(server, {root: path.join(__dirname, '../../../dist'), layout: false, viewExt: 'html'});
}
