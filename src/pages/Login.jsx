import { useState } from 'react'
import { Trophy } from 'lucide-react'

const demoUsers = {
  admin: { email: 'admin@example.com', password: 'admin123', name: 'Admin User' },
  student: { email: 'student@example.com', password: 'student123', name: 'Sarah Wilson' },
}

function Login({ onLogin }) {
  const [role, setRole] = useState('student')
  const [email, setEmail] = useState(demoUsers.student.email)
  const [password, setPassword] = useState(demoUsers.student.password)
  const [error, setError] = useState('')

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole)
    setEmail(demoUsers[selectedRole].email)
    setPassword(demoUsers[selectedRole].password)
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const account = demoUsers[role]

    if (email !== account.email || password !== account.password) {
      setError('Invalid credentials for selected role. Try demo credentials below.')
      return
    }

    onLogin({
      role,
      name: account.name,
      email,
      initials: role === 'admin' ? 'AD' : 'SW',
      tag: role === 'admin' ? 'Administrator' : 'Student',
      title: role === 'admin' ? 'Admin Panel' : 'Student Portal',
    })
  }

  return (
    <div className="login-page">
      <div className="login-card animate-in">
        <div className="login-brand">
          <div className="login-brand-icon">
            <Trophy size={28} color="white" />
          </div>
          <div>
            <h1>Student Achievements Platform</h1>
            <p>Track and manage extracurricular achievements</p>
          </div>
        </div>

        <div className="login-role-tabs">
          <button
            type="button"
            className={`login-role-btn ${role === 'admin' ? 'active' : ''}`}
            onClick={() => handleRoleChange('admin')}
          >
            Admin
          </button>
          <button
            type="button"
            className={`login-role-btn ${role === 'student' ? 'active' : ''}`}
            onClick={() => handleRoleChange('student')}
          >
            Student
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Login as {role === 'admin' ? 'Admin' : 'Student'}
          </button>
        </form>

        <div className="login-demo">
          <h4>Demo Credentials</h4>
          <p><strong>Admin:</strong> admin@example.com / admin123</p>
          <p><strong>Student:</strong> student@example.com / student123</p>
        </div>
      </div>
    </div>
  )
}

export default Login
