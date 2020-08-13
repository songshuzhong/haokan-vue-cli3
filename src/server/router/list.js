async function mockList(pid, drowsiness) {
  await sleep(drowsiness)

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
  'POST /api/mis': async ctx => {
    await sleep(1000)
    ctx.restify({ code: 1000, msg: 'success' })
  },
  'GET /api/list/:id/:drowsiness': async ctx => {
    const pid = ctx.params.id || '1'
    const drowsiness = ctx.params.drowsiness || 0

    let list = await mockList(pid, drowsiness)
    ctx.restify(list)
  },
  'GET /api/pagelist/:pageIndex/:pageSize': async ctx => {
    const pageIndex = ctx.params.pageIndex
    const pageSize = ctx.params.pageSize

    let list = await mockList(pageIndex, 1500)
    ctx.restify({
      code: 1000,
      result: {
        page: pageIndex,
        page_size: pageSize,
        total: 20,
        list,
      },
    })
  },
}
