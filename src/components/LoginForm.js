import React, { useState }  from 'react'

const LoginForm = ({ handleLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setPassword('')
    setUsername('')
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Username: <input value={username} id='username'
            onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          Password: <input type="password" value={password} id='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id='login-button'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm