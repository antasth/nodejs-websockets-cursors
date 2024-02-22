import crypto from 'crypto'
import http from 'http'
import url from 'url'
import { WebSocketServer } from 'ws'

const server = http.createServer()
const wsServer = new WebSocketServer({ server })

const port = 8000

wsServer.on('connection', (connection, request) => {
  const { username } = url.parse(request.url, true).query
  const id = crypto.randomBytes(16).toString('hex')

  console.log(username, id)
})

server.listen(port, () => {
  console.log(`WS server is running on port ${port}`)
})
