const http = require('http')
const controller = require('./apis')
const server = http.createServer()

server.on('request', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.status = 200
    res.end()
    return
  }

  if (req.url === '/api/upload') {
    await controller.handlerFormData(req, res)
  }
})

server.listen(3000, () => console.log('the server is running on 3000'))
