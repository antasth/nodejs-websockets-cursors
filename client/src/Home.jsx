import throttle from 'lodash.throttle'
import { useEffect, useRef } from 'react'
import useWebSocket from 'react-use-websocket'
import { Cursor } from './components/Cursor'

const renderCursors = (users) => {
  return Object.keys(users).map((uuid) => {
    const user = users[uuid]

    return <Cursor key={uuid} point={[user.state.x, user.state.y]} />
  })
}
// eslint-disable-next-line react/prop-types
const Home = ({ username }) => {
  const WS_URL = 'ws://localhost:8000'
  const THROTTLE = 50
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username },
  })

  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE))

  useEffect(() => {
    sendJsonMessage({
      x: 0,
      y: 0,
    })
    window.addEventListener('mousemove', (e) => {
      sendJsonMessageThrottled.current({ x: e.clientX, y: e.clientY })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (lastJsonMessage) {
    return <div>{renderCursors(lastJsonMessage)}</div>
  }
  return (
    <>
      <h1>Home</h1>
      <h3>Hello {username}</h3>
    </>
  )
}

export { Home }
