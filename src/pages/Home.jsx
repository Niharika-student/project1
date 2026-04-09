import { useState } from 'react'
import { BadgeCheck, Sparkles, TrendingUp, User, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const [role, setRole] = useState('student')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const onRoleChange = (nextRole) => {
    setRole(nextRole)
    setError('')
    setIdentifier('')
    setPassword('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const trimmedIdentifier = identifier.trim()
    const trimmedPassword = password.trim()

    if (!trimmedIdentifier || !trimmedPassword) {
      setError('Enter both identifier and password.')
      return
    }

    const result = await login({ role, email: trimmedIdentifier, password: trimmedPassword })
    if (!result.ok) {
      setError(result.message)
      return
    }

    navigate(role === 'student' ? '/student' : '/admin')
  }

  return (
    <main className="portal-home">
      <section className="portal-header">
        <h1>Achievement Portal</h1>
        <p>Track, Manage &amp; Showcase Extracurricular Excellence</p>
        <div className="portal-features">
          <span><Sparkles size={16} /> Smart Tracking</span>
          <span><BadgeCheck size={16} /> Digital Certificates</span>
          <span><TrendingUp size={16} /> Analytics</span>
        </div>
      </section>

      <section className="portal-card-wrap">
        <form className="portal-login-card" onSubmit={onSubmit}>
          <h2>Welcome Back</h2>
          <p>Select your role to continue</p>

          <div className="portal-role-switch" role="tablist" aria-label="Role selector">
            <button
              type="button"
              className={`portal-role-tab ${role === 'student' ? 'active' : ''}`}
              onClick={() => onRoleChange('student')}
            >
              <User size={16} />
              Student
            </button>
            <button
              type="button"
              className={`portal-role-tab ${role === 'admin' ? 'active' : ''}`}
              onClick={() => onRoleChange('admin')}
            >
              <Users size={16} />
              Admin
            </button>
          </div>

          <label htmlFor="portal-identifier">{role === 'student' ? 'Username or Email' : 'Admin ID'}</label>
          <input
            id="portal-identifier"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder={role === 'student' ? 'Enter your roll number or email' : 'Enter your admin id or email'}
          />

          <label htmlFor="portal-password">Password</label>
          <input
            id="portal-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
          />

          {error && <p className="portal-error">{error}</p>}

          <button className="portal-submit" type="submit">
            Sign In as {role === 'student' ? 'Student' : 'Admin'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default Home
