import { Award, CalendarDays, ClipboardCheck, Star, Trophy, Users } from 'lucide-react'

const profile = {
  name: 'Sarah Wilson',
  studentId: 'STU-003',
  department: 'Business',
  year: 'Sophomore',
}

const myStats = [
  { label: 'Achievement Records', value: 9, icon: Trophy },
  { label: 'Events Joined', value: 14, icon: Users },
  { label: 'Verified Badges', value: 5, icon: Award },
  { label: 'Showcase Score', value: 93, icon: Star },
]

const timeline = [
  { title: 'Inter-College Debate Runner-Up', tag: 'Leadership', date: '2026-02-18', status: 'Verified' },
  { title: 'Community Health Camp Volunteer', tag: 'Community', date: '2026-02-09', status: 'Verified' },
  { title: 'Startup Pitch Participation', tag: 'Academic', date: '2026-01-26', status: 'Pending' },
  { title: 'Annual Cultural Fest Host', tag: 'Arts', date: '2026-01-12', status: 'Verified' },
]

const goals = [
  { title: 'Complete 12 achievements this semester', progress: 75 },
  { title: 'Join 3 new campus clubs', progress: 67 },
  { title: 'Reach a showcase score of 100', progress: 58 },
]

const nextActions = [
  { task: 'Upload evidence for debate certificate', due: 'Apr 09' },
  { task: 'Request organizer sign-off for health camp', due: 'Apr 11' },
  { task: 'Submit reflection note for pitch participation', due: 'Apr 14' },
]

function StudentDashboard({ student }) {
  const profileData = {
    ...profile,
    name: student?.name || profile.name,
    role: student?.tag || 'Student',
  }

  return (
    <div className="animate-in">
      <section className="table-card" style={{ marginBottom: '20px' }}>
        <div className="table-header" style={{ borderBottom: 'none' }}>
          <div>
            <h3 className="table-title">Welcome, {profileData.name}</h3>
            <p className="muted-line">
              {profileData.studentId} • {profileData.department} • {profileData.year} • {profileData.role}
            </p>
          </div>
        </div>
      </section>

      <div className="stats-grid">
        {myStats.map((item) => (
          <section className="stat-card" key={item.label}>
            <div className="stat-card-header">
              <div className="stat-card-icon">
                <item.icon size={18} />
              </div>
            </div>
            <div className="stat-card-value">{item.value}</div>
            <div className="stat-card-label">{item.label}</div>
          </section>
        ))}
      </div>

      <div className="charts-grid">
        <section className="table-card">
          <div className="table-header">
            <h3 className="table-title">Recent Records Timeline</h3>
          </div>
          <div className="insight-list">
            {timeline.map((entry) => (
              <article className="timeline-item" key={`${entry.title}-${entry.date}`}>
                <div className="timeline-dot" />
                <div>
                  <h4>{entry.title}</h4>
                  <p>{entry.tag} • {entry.date}</p>
                </div>
                <span className={`status-pill ${entry.status === 'Verified' ? 'verified' : 'pending'}`}>{entry.status}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="table-card" style={{ padding: '18px' }}>
          <h3 className="table-title" style={{ marginBottom: '12px' }}>Semester Goals</h3>
          {goals.map((goal) => (
            <article key={goal.title} className="student-goal-item">
              <div className="goal-head">
                <span>{goal.title}</span>
                <strong>{goal.progress}%</strong>
              </div>
              <div className="student-goal-track">
                <div className="student-goal-progress" style={{ width: `${goal.progress}%` }} />
              </div>
            </article>
          ))}
        </section>
      </div>

      <div className="charts-grid" style={{ marginTop: '18px' }}>
        <section className="table-card">
          <div className="table-header">
            <h3 className="table-title">Upcoming Actions</h3>
          </div>
          <div className="insight-list">
            {nextActions.map((item) => (
              <article className="insight-item" key={item.task}>
                <ClipboardCheck size={16} />
                <p>{item.task}</p>
                <span className="student-date-badge">{item.due}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="recent-activity">
          <h3 className="table-title">Calendar Snapshot</h3>
          <article className="activity-item">
            <div className="activity-icon"><CalendarDays size={14} /></div>
            <div className="activity-content">
              <h4>Review day</h4>
              <p>Friday: faculty verification window opens at 10:00 AM.</p>
            </div>
          </article>
          <article className="activity-item">
            <div className="activity-icon"><CalendarDays size={14} /></div>
            <div className="activity-content">
              <h4>Submission reminder</h4>
              <p>Upload pending artifacts before Sunday 6:00 PM.</p>
            </div>
          </article>
        </section>
      </div>
    </div>
  )
}

export default StudentDashboard
