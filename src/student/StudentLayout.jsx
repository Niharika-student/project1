import { Outlet, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import StudentNavbar from './StudentNavbar'
import { useAuth } from '../context/AuthContext'

function StudentLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const onLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="portal-shell">
      <header className="portal-topbar">
        <div className="portal-user-block">
          <div className="portal-avatar">{(user?.name || 'S').slice(0, 1)}</div>
          <div>
            <h2>{user?.name || 'Emma Johnson'}</h2>
            <p>10th Grade • STU001</p>
          </div>
        </div>
        <div className="portal-topbar-right">
          <div className="portal-corner-profile">
            <div className="portal-avatar">{(user?.name || 'S').slice(0, 1)}</div>
            <div>
              <strong>{user?.name || 'Emma Johnson'}</strong>
              <span>{user?.email || 'student@example.com'}</span>
            </div>
          </div>
          <button className="portal-logout" onClick={onLogout}><LogOut size={18} /> Logout</button>
        </div>
      </header>

      <div className="portal-main-shell">
        <aside className="portal-sidebar">
          <StudentNavbar />
        </aside>
        <main className="portal-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default StudentLayout
