import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { apiUrl } from '../config/api'

function Signup() {
  const [admin, setAdmin] = useState({
    username: '',
    password: '',
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setAdmin((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const response = await fetch(apiUrl('/api/admins/register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(admin),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok) {
        setMessage(data.message || 'Signup successful')
        setAdmin({ username: '', password: '' })
        navigate('/admin/login', { replace: true })
        return
      }

      setMessage(data.message || 'Signup failed')
    } catch {
      setMessage('Backend connection error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-split">
        <section className="auth-hero">
          <p className="landing-kicker">Admin Portal</p>
          <h2>Create an admin account for secure platform access.</h2>
          <p>Set up a new admin login before moving into the dashboard.</p>
        </section>

        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="auth-card-head">
            <div>
              <h2>Admin Signup</h2>
              <p>Register a new admin username and password.</p>
            </div>
          </div>

          <input
            className="form-input"
            type="text"
            name="username"
            placeholder="Enter username"
            value={admin.username}
            onChange={handleChange}
            required
          />

          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Enter password"
            value={admin.password}
            onChange={handleChange}
            required
          />

          {message && <p className="login-error">{message}</p>}

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Signup'}
          </button>

          <p style={{ margin: 0, fontSize: '0.95rem', color: '#64748B' }}>
            Already registered? <Link to="/admin/login">Back to login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup