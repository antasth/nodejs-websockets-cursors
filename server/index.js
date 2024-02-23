import crypto from 'crypto'
import http from 'http'
import url from 'url'
import { WebSocketServer } from 'ws'

const server = http.createServer()
const wsServer = new WebSocketServer({ server })

const port = 8000
const connections = {}
const users = {}

const broadcastUsers = () => {
  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid]
    const message = JSON.stringify(users)
    connection.send(message)
  })
}

const handleMessage = (bytes, uuid) => {
  const message = JSON.parse(bytes.toString())
  // console.log('message', message)
  const user = users[uuid]

  user.state = message
  // console.log('user', user)
  broadcastUsers()

  console.log(
    `User ${user.username} updated their state: ${JSON.stringify(user.state)}`
  )
}

const handleClose = (uuid) => {
  console.log(`User ${users[uuid].username} is disconnected`)
  delete connections[uuid]
  delete users[uuid]

  broadcastUsers()
}

wsServer.on('connection', (connection, request) => {
  const { username } = url.parse(request.url, true).query
  const uuid = crypto.randomBytes(16).toString('hex')

  console.log(`User ${username} is connected, uuid: ${uuid}`)

  connections[uuid] = connection

  users[uuid] = {
    username,
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
