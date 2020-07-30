module.exports = {
  'GET /': async ctx => {
    await ctx.render('index')
  },
  'GET /index': async ctx => {
    await ctx.render('index')
  },
  'GET /about': async ctx => {
    await ctx.render('about/index')
  },
  'GET /contact': async ctx => {
    await ctx.render('contact/index')
  },
}
