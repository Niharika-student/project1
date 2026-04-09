import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Page Not Found</h2>
        <p>The page you requested does not exist.</p>
        <Link className="btn btn-primary" to="/">Go to Home</Link>
      </div>
    </div>
  )
}

export default PageNotFound
