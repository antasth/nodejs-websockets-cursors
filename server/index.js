import http from 'http'
import { WebSocketServer } from 'ws'

const server = http.createServer()
const wsServer = new WebSocketServer({ server })

const port = 8000

server.listen(port, () => {
  console.log(`WS server is running on port ${port}`)
})
