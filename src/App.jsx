import { Routes, Route, NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Award, 
  BarChart3, 
  Trophy,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  LogOut
} from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'
import Students from './pages/Students'
import Achievements from './pages/Achievements'
import Analytics from './pages/Analytics'
import StudentDashboard from './pages/StudentDashboard'
import StudentAchievements from './pages/StudentAchievements'
import Login from './pages/Login'
import { useEffect, useState } from 'react'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [authUser, setAuthUser] = useState(() => {
    const saved = localStorage.getItem('sap-user')
    return saved ? JSON.parse(saved) : null
  })
  const [now, setNow] = useState(new Date())
  const location = useLocation()
  const navigate = useNavigate()

  const role = authUser?.role || 'student'
  
  const adminNavItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard', badge: null },
    { path: '/reports', icon: FileText, label: 'Reports', badge: '3' },
    { path: '/students', icon: Users, label: 'Students', badge: null },
    { path: '/achievements', icon: Award, label: 'Achievements', badge: null },
    { path: '/analytics', icon: BarChart3, label: 'Analytics', badge: null },
  ]

  const studentNavItems = [
    { path: '/', icon: LayoutDashboard, label: 'My Dashboard', badge: null },
    { path: '/my-achievements', icon: Trophy, label: 'My Achievements', badge: null },
    { path: '/showcase', icon: GraduationCap, label: 'Showcase', badge: null },
  ]

  const navItems = role === 'admin' ? adminNavItems : studentNavItems

  const pageTitles = {
    admin: {
      '/': 'Dashboard Overview',
      '/reports': 'Reports',
      '/students': 'Students',
      '/achievements': 'Achievements',
      '/analytics': 'Analytics',
    },
    student: {
      '/': 'My Dashboard',
      '/my-achievements': 'My Achievements',
      '/showcase': 'Participation Showcase',
    },
  }

  const roleMeta = {
    admin: { title: 'Admin Panel', name: authUser?.name || 'Admin User', tag: 'Administrator', initials: authUser?.initials || 'AD' },
    student: { title: 'Student Portal', name: authUser?.name || 'Student User', tag: 'Student', initials: authUser?.initials || 'ST' },
  }

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const handleLogin = (userData) => {
    setAuthUser(userData)
    localStorage.setItem('sap-user', JSON.stringify(userData))
    setSidebarOpen(false)
    navigate('/')
  }

  const handleLogout = () => {
    setAuthUser(null)
    localStorage.removeItem('sap-user')
    setSidebarOpen(false)
    navigate('/')
  }

  const getPageTitle = () => {
    return pageTitles[role][location.pathname] || 'Student Achievements Platform'
  }

  const formattedDateTime = now.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  if (!authUser) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="app">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 99,
            display: 'none'
          }}
          onClick={() => setSidebarOpen(false)}
          className="mobile-overlay"
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <Trophy size={26} color="white" />
            </div>
            <div className="sidebar-logo-text">
              <h1>Achievements</h1>
              <span>{roleMeta[role].title}</span>
            </div>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">Main Menu</div>
            {navItems.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                end={item.path === '/'}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="nav-icon">
                  <item.icon size={20} />
                </span>
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </NavLink>
            ))}
          </div>
          
          <div className="nav-section">
            <div className="nav-section-title">Account</div>
            <button className="nav-item nav-item-btn" onClick={handleLogout}>
              <span className="nav-icon">
                <LogOut size={20} />
              </span>
              <span>Sign Out</span>
            </button>
          </div>
        </nav>

        {/* User Card in Sidebar */}
        <div style={{ 
          padding: '20px', 
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.03)'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            padding: '12px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366F1 0%, #10B981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: '14px'
            }}>
              {roleMeta[role].initials}
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>{roleMeta[role].name}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>{roleMeta[role].tag}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <button 
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h2 className="page-title">{getPageTitle()}</h2>
          </div>
          
          <div className="header-right">
            <div className="search-wrapper">
              <div className="search-box">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder={role === 'admin' ? 'Search students, achievements...' : 'Search your achievements...'} 
                />
              </div>
            </div>
            
            <div className="header-actions">
              <span className={`portal-chip ${role}`}>
                {role === 'admin' ? 'Admin Portal' : 'Student Portal'}
              </span>
              <span className="header-date-time">{formattedDateTime}</span>
              <button className="header-icon-btn">
                <Bell size={20} />
                <span className="notification-badge"></span>
              </button>
            </div>
            
            <div className="user-menu">
              <div className="user-avatar">{roleMeta[role].initials}</div>
              <div className="user-info">
                <span className="user-name">{roleMeta[role].name}</span>
                <span className="user-role">{roleMeta[role].tag}</span>
              </div>
              <ChevronDown size={16} color="#64748B" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content">
          <Routes>
            {role === 'admin' ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/students" element={<Students />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<StudentDashboard student={authUser} />} />
                <Route path="/my-achievements" element={<StudentAchievements mode="track" student={authUser} />} />
                <Route path="/showcase" element={<StudentAchievements mode="showcase" student={authUser} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
