import { NavLink } from 'react-router-dom'
import { BarChart3, BookOpen, Trophy, UserPlus, Users, UserSquare2 } from 'lucide-react'

const links = [
  { to: '/admin', label: 'Achievements', icon: Trophy },
  { to: '/admin/courses', label: 'Courses', icon: BookOpen },
  { to: '/admin/students', label: 'Students', icon: Users },
  { to: '/admin/register-student', label: 'Register Student', icon: UserPlus },
  { to: '/admin/teachers', label: 'Teachers', icon: UserSquare2 },
  { to: '/admin/approvals', label: 'Approvals', icon: BarChart3 },
]

function AdminNavbar() {
  return (
    <nav className="section-nav">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.to === '/admin'} className={({ isActive }) => `section-link ${isActive ? 'active' : ''}`}>
          <link.icon size={17} />
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default AdminNavbar
