import { Award, Star, Trophy, Users } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { chartTooltipStyle } from '../utils/chartTooltip'

const profile = {
  name: 'Sarah Wilson',
  studentId: 'STU-003',
  department: 'Business',
  year: 'Sophomore',
}

const myStats = [
  { label: 'Total Achievements', value: '9', icon: Trophy, color: '#6366F1' },
  { label: 'Participation Events', value: '14', icon: Users, color: '#10B981' },
  { label: 'Recognition Awards', value: '5', icon: Award, color: '#F59E0B' },
  { label: 'Showcase Score', value: '93', icon: Star, color: '#9333EA' },
]

const monthlyProgress = [
  { month: 'Jan', points: 20 },
  { month: 'Feb', points: 26 },
  { month: 'Mar', points: 34 },
  { month: 'Apr', points: 38 },
  { month: 'May', points: 48 },
  { month: 'Jun', points: 56 },
]

const recentItems = [
  { id: 1, title: 'Inter-College Debate Runner-Up', type: 'Leadership', date: '2026-02-18', status: 'Verified' },
  { id: 2, title: 'Community Health Camp Volunteer', type: 'Community', date: '2026-02-09', status: 'Verified' },
  { id: 3, title: 'Startup Pitch Participation', type: 'Academic', date: '2026-01-26', status: 'Pending' },
  { id: 4, title: 'Annual Cultural Fest Host', type: 'Arts', date: '2026-01-12', status: 'Verified' },
]

const upcomingEvents = [
  { id: 1, title: 'State Debate League', club: 'Debate Club', date: '2026-03-03' },
  { id: 2, title: 'Financial Literacy Workshop', club: 'Business Association', date: '2026-03-08' },
  { id: 3, title: 'Green Campus Drive', club: 'Community Cell', date: '2026-03-14' },
]

const semesterGoals = [
  { id: 1, label: 'Complete 12 achievements', progress: 75 },
  { id: 2, label: 'Join 3 new activity clubs', progress: 67 },
  { id: 3, label: 'Reach 100 showcase points', progress: 58 },
]

function StudentDashboard({ student }) {
  const profileData = {
    ...profile,
    name: student?.name || profile.name,
    role: student?.tag || 'Student',
  }

  return (
    <div className="animate-in">
      <div className="table-card" style={{ marginBottom: '24px' }}>
        <div className="table-header" style={{ borderBottom: 'none' }}>
          <div>
            <h3 className="table-title">Welcome, {profileData.name}</h3>
            <p style={{ color: '#64748B', fontSize: '13px', marginTop: '4px' }}>
              {profileData.studentId} • {profileData.department} • {profileData.year} • {profileData.role}
            </p>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {myStats.map((item) => (
          <div className="stat-card" key={item.label}>
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)` }}>
                <item.icon size={22} />
              </div>
            </div>
            <div className="stat-card-value">{item.value}</div>
            <div className="stat-card-label">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-card-header">
            <h3 className="chart-card-title">My Participation Growth</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyProgress}>
              <defs>
                <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  ...chartTooltipStyle,
                  borderRadius: '12px',
                }}
              />
              <Area type="monotone" dataKey="points" stroke="#6366F1" fillOpacity={1} fill="url(#colorPoints)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="table-card" style={{ padding: '20px' }}>
          <h3 className="table-title" style={{ marginBottom: '14px' }}>Recent Extracurricular Records</h3>
          {recentItems.map((item) => (
            <div key={item.id} className="activity-item" style={{ marginBottom: '10px' }}>
              <div className="activity-content">
                <h4>{item.title}</h4>
                <p>{item.type} • {item.date}</p>
              </div>
              <span className={`status-pill ${item.status === 'Verified' ? 'verified' : 'pending'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="charts-grid" style={{ marginTop: '24px' }}>
        <div className="table-card" style={{ padding: '20px' }}>
          <h3 className="table-title" style={{ marginBottom: '16px' }}>Semester Goals</h3>
          {semesterGoals.map((goal) => (
            <div key={goal.id} className="student-goal-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>{goal.label}</span>
                <span style={{ fontSize: '13px', color: '#6366F1', fontWeight: '700' }}>{goal.progress}%</span>
              </div>
              <div className="student-goal-track">
                <div className="student-goal-progress" style={{ width: `${goal.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="table-card" style={{ padding: '20px' }}>
          <h3 className="table-title" style={{ marginBottom: '16px' }}>Upcoming Events</h3>
          {upcomingEvents.map((event) => (
            <div key={event.id} className="activity-item" style={{ marginBottom: '10px' }}>
              <div className="activity-content">
                <h4>{event.title}</h4>
                <p>{event.club}</p>
              </div>
              <span className="student-date-badge">{event.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
