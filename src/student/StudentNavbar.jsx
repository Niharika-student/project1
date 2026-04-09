import { NavLink } from 'react-router-dom'
import { ClipboardCheck, GraduationCap, Lightbulb, Trophy, User } from 'lucide-react'

const links = [
  { to: '/student', label: 'My Achievements', icon: Trophy },
  { to: '/student/showcase', label: 'Showcase', icon: User },
  { to: '/student/assigned-teacher', label: 'Assigned Teacher', icon: GraduationCap },
  { to: '/student/course-registration', label: 'Course Registration', icon: ClipboardCheck },
  { to: '/student/improvement-suggestions', label: 'Suggestions', icon: Lightbulb },
]

function StudentNavbar() {
  return (
    <nav className="section-nav">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.to === '/student'} className={({ isActive }) => `section-link ${isActive ? 'active' : ''}`}>
          <link.icon size={17} />
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default StudentNavbar
