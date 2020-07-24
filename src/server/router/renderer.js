async function mockList(pid) {
  await sleep(500)

  const children = []
  for (let i = 1; i < 10; i++) {
    if (pid.length < 6) {
      children.push({
        id: pid + i,
        name: '计划系列名称之' + pid + i,
        children: [],
      })
    } else {
      children.push({
        id: pid + i,
        name: '计划系列名称之' + pid + i,
      })
    }
  }

  return children
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

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
  'GET /api/list/:id': async ctx => {
    const pid = ctx.params.id || '1'
    let list = await mockList(pid)
    ctx.restify(list)
  },
}
