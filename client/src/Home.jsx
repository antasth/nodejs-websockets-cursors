import throttle from 'lodash.throttle'
import { useEffect, useRef } from 'react'
import useWebSocket from 'react-use-websocket'

// eslint-disable-next-line react/prop-types
const Home = ({ username }) => {
  const WS_URL = 'ws://localhost:8000'
  const THROTTLE = 50
  const { sendJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username },
  })

  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE))

  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      sendJsonMessageThrottled.current({ x: e.clientX, y: e.clientY })
    })
  }, [sendJsonMessageThrottled])

  return (
    <>
      <h1>Home</h1>
      <h3>Hello {username}</h3>
    </>
  )
}

export { Home }
