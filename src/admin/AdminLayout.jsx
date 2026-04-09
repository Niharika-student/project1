import { Outlet, useNavigate } from 'react-router-dom'
import { LogOut, Trophy } from 'lucide-react'
import AdminNavbar from './AdminNavbar'
import { useAuth } from '../context/AuthContext'

function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const onLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="portal-shell">
      <header className="portal-topbar">
        <div className="portal-user-block admin-title">
          <div className="portal-avatar mini-icon"><Trophy size={20} /></div>
          <div>
            <h2>Admin Dashboard</h2>
            <p>Manage student achievements</p>
          </div>
        </div>
        <div className="portal-topbar-right">
          <div className="portal-corner-profile admin-profile professional-profile-card">
            <div className="portal-avatar mini-icon"><Trophy size={16} /></div>
            <div className="profile-primary">
              <strong>{user?.name || 'Administrator'}</strong>
              <span>{user?.username || user?.email || 'admin@school.edu'}</span>
            </div>
            <div className="profile-meta">
              <span>Role: Portal Administrator</span>
              <span>Access: Full Control</span>
            </div>
          </div>
          <button className="portal-logout" onClick={onLogout}><LogOut size={18} /> Logout</button>
        </div>
      </header>

      <div className="portal-main-shell">
        <aside className="portal-sidebar">
          <AdminNavbar />
        </aside>
        <main className="portal-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
