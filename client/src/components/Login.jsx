import { useState } from 'react'

// eslint-disable-next-line react/prop-types
const Login = ({ onSubmit }) => {
  const [userName, setUserName] = useState('')

  return (
    <>
      <h1>Welcome</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(userName)
        }}
      >
        <input
          type="text"
          value={userName}
          placeholder="username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input type="submit" />
      </form>
    </>
  )
}

export { Login }
