import { useState } from 'react'
import { Mail, MessageSquare, UserCircle2 } from 'lucide-react'

function AssignedTeacher() {
  const [message, setMessage] = useState('')

  return (
    <section className="page-stack">
      <div className="page-hero compact">
        <div>
          <p className="landing-kicker">Mentor Support</p>
          <h3 className="page-hero-title">See your assigned teacher and contact them easily.</h3>
          <p className="page-hero-copy">A compact profile card keeps the most important teacher information in view.</p>
        </div>
        <div className="hero-badges">
          <span><UserCircle2 size={14} /> Teacher profile</span>
          <span><Mail size={14} /> Contact email</span>
          <span><MessageSquare size={14} /> Request meeting</span>
        </div>
      </div>

      <h3 className="section-title">Assigned Teacher</h3>
      <div className="profile-card">
        <div className="profile-card-head">
          <div className="profile-avatar">MR</div>
          <div>
            <strong>Dr. Maya Rao</strong>
            <p>Student Affairs</p>
          </div>
        </div>
        <div className="profile-card-body">
          <p><strong>Email:</strong> maya.rao@example.com</p>
          <p><strong>Department:</strong> Student Affairs</p>
          <p><strong>Office Hours:</strong> Mon - Fri, 10:00 AM to 2:00 PM</p>
        </div>
        <div className="form-actions">
          <button className="btn btn-secondary" type="button" onClick={() => setMessage('Meeting request sent successfully.')}>Request Meeting</button>
          <button className="btn btn-secondary" type="button" onClick={() => setMessage('Teacher profile viewed.')}>View Profile</button>
        </div>
        {message && <p className="page-message">{message}</p>}
      </div>
    </section>
  )
}

export default AssignedTeacher
