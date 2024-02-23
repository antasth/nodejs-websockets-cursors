import { useState } from 'react'
import './App.css'
import { Login } from './components/Login'
import { Home } from './Home'

function App() {
  const [username, setUsername] = useState('')

  if (username) {
    return <Home username={username} />
  }

  return (
    <>
      <h1>Cursors App</h1>
      <Login onSubmit={setUsername} />
    </>
  )
}

export default App
