import { useState } from 'react'

function TeacherLogin() {
  const [email, setEmail] = useState('teacher@example.com')
  const [password, setPassword] = useState('teacher123')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (email && password) {
      setMessage('Teacher login validated. Teacher module can be connected next.')
    } else {
      setMessage('Please enter email and password.')
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Teacher Login</h2>
        <p>Demo credentials are pre-filled.</p>
        <input className="form-input" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
        <input className="form-input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
        {message && <p className="login-error" style={{ color: '#1d7d4c' }}>{message}</p>}
        <button className="btn btn-primary" type="submit">Validate Teacher Login</button>
      </form>
    </div>
  )
}

export default TeacherLogin
