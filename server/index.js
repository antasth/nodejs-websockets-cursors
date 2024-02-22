import crypto from 'crypto'
import http from 'http'
import url from 'url'
import { WebSocketServer } from 'ws'

const server = http.createServer()
const wsServer = new WebSocketServer({ server })

const port = 8000
const connections = {}
const users = {}

const handleMessage = (bytes, uuid) => {
  const message = JSON.parse(bytes.toString())
  console.log('message', message)
  const user = users[uuid]

  user.state = message
  console.log('user', user)
}

const handleClose = (uuid) => {
  //
}

wsServer.on('connection', (connection, request) => {
  const { username } = url.parse(request.url, true).query
  const uuid = crypto.randomBytes(16).toString('hex')

  console.log(username, uuid)

  connections[uuid] = connection

  connection.username = users[uuid] = {
    username,
    uuid,
    state: {
      x: 0,
      y: 0,
    },
  }
  connection.on('message', (message) => handleMessage(message, uuid))
  connection.on('close', () => handleClose(uuid))
})

server.listen(port, () => {
  console.log(`WS server is running on port ${port}`)
})
