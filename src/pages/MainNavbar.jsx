import { Link } from 'react-router-dom'

function MainNavbar() {
  return (
    <header className="main-navbar">
      <div className="main-navbar-brand">
        <span className="main-navbar-dot" />
        <h1>Student Achievements Platform</h1>
      </div>
      <div className="main-nav-links">
        <Link to="/admin/login">Admin Login</Link>
        <Link to="/teacher/login">Teacher Login</Link>
        <Link to="/student/login">Student Login</Link>
        <Link to="/student/register">Student Registration</Link>
      </div>
    </header>
  )
}

export default MainNavbar
