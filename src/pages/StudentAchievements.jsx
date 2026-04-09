import { useMemo, useState } from 'react'
import { Search, Trophy, Medal, CalendarDays } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const myAchievements = [
  { id: 1, title: 'Inter-College Debate Runner-Up', category: 'Leadership', date: '2026-02-18', level: 'City', points: 22, status: 'Verified', organizer: 'City Youth Forum' },
  { id: 2, title: 'Community Health Camp Volunteer', category: 'Community', date: '2026-02-09', level: 'College', points: 12, status: 'Verified', organizer: 'NSS Unit' },
  { id: 3, title: 'Startup Pitch Participation', category: 'Academic', date: '2026-01-26', level: 'State', points: 16, status: 'Pending', organizer: 'Innovation Club' },
  { id: 4, title: 'Annual Cultural Fest Host', category: 'Arts', date: '2026-01-12', level: 'College', points: 10, status: 'Verified', organizer: 'Cultural Committee' },
  { id: 5, title: 'Women Football Invitational', category: 'Sports', date: '2025-12-20', level: 'District', points: 14, status: 'Verified', organizer: 'Sports Council' },
  { id: 6, title: 'Peer Mentorship Program', category: 'Community', date: '2025-12-04', level: 'College', points: 9, status: 'Verified', organizer: 'Mentor Cell' },
]

const categories = ['All', 'Academic', 'Sports', 'Arts', 'Leadership', 'Community']

function StudentAchievements({ mode = 'track', student }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const profile = {
    name: student?.name || 'Sarah Wilson',
    studentId: 'STU-003',
    department: 'Business',
    year: 'Sophomore',
    email: student?.email || 'student@example.com',
  }

  const filtered = useMemo(() => {
    return myAchievements.filter((item) => {
      const bySearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.organizer.toLowerCase().includes(searchTerm.toLowerCase())
      const byCategory = categoryFilter === 'All' || item.category === categoryFilter
      return bySearch && byCategory
    })
  }, [searchTerm, categoryFilter])

  const totalPoints = myAchievements.reduce((sum, item) => sum + item.points, 0)
  const verifiedAchievements = myAchievements.filter((item) => item.status === 'Verified')
  const showcaseItems = [...verifiedAchievements].sort((first, second) => second.points - first.points)

  const chartSource = mode === 'track' ? filtered : showcaseItems

  const categoryChartData = useMemo(() => {
    const totals = chartSource.reduce((accumulator, item) => {
      accumulator[item.category] = (accumulator[item.category] || 0) + item.points
      return accumulator
    }, {})

    return Object.entries(totals).map(([name, points]) => ({ name, points }))
  }, [chartSource])

  const statusChartData = useMemo(() => {
    const totals = chartSource.reduce((accumulator, item) => {
      accumulator[item.status] = (accumulator[item.status] || 0) + 1
      return accumulator
    }, {})

    return Object.entries(totals).map(([name, value]) => ({ name, value }))
  }, [chartSource])

  const chartPalette = ['#4F46E5', '#0EA5E9', '#16A34A', '#EA580C', '#D946EF', '#F59E0B']

  return (
    <div className="animate-in">
      <div className="table-card student-profile-card" style={{ marginBottom: '20px' }}>
        <div className="table-header" style={{ borderBottom: 'none' }}>
          <h3 className="table-title">Student Profile</h3>
        </div>
        <div className="student-profile-grid">
          <div className="student-profile-item">
            <span className="student-profile-label">Name</span>
            <span className="student-profile-value">{profile.name}</span>
          </div>
          <div className="student-profile-item">
            <span className="student-profile-label">Student ID</span>
            <span className="student-profile-value">{profile.studentId}</span>
          </div>
          <div className="student-profile-item">
            <span className="student-profile-label">Department</span>
            <span className="student-profile-value">{profile.department}</span>
          </div>
          <div className="student-profile-item">
            <span className="student-profile-label">Year</span>
            <span className="student-profile-value">{profile.year}</span>
          </div>
          <div className="student-profile-item">
            <span className="student-profile-label">Email</span>
            <span className="student-profile-value">{profile.email}</span>
          </div>
          <div className="student-profile-item">
            <span className="student-profile-label">Portfolio Mode</span>
            <span className="student-profile-value">{mode === 'track' ? 'My Achievements' : 'Showcase'}</span>
          </div>
        </div>
      </div>

      <div className="summary-grid" style={{ marginBottom: '20px' }}>
        <div className="summary-card">
          <div className="summary-card-label">{mode === 'track' ? 'Achievement Records' : 'Showcase Records'}</div>
          <div className="summary-card-value">{mode === 'track' ? myAchievements.length : showcaseItems.length}</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-label">Verified Achievements</div>
          <div className="summary-card-value">{verifiedAchievements.length}</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-label">Total Points</div>
          <div className="summary-card-value">{totalPoints}</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-label">Categories Participated</div>
          <div className="summary-card-value">{new Set(myAchievements.map((item) => item.category)).size}</div>
        </div>
      </div>

      <div className="charts-grid" style={{ marginBottom: '20px' }}>
        <section className="table-card chart-panel">
          <div className="table-header">
            <h3 className="table-title">Points by Category</h3>
          </div>
          <div className="chart-canvas">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="points" radius={[6, 6, 0, 0]}>
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`category-${entry.name}`} fill={chartPalette[index % chartPalette.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="table-card chart-panel">
          <div className="table-header">
            <h3 className="table-title">Records by Status</h3>
          </div>
          <div className="chart-canvas">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusChartData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={4}>
                  {statusChartData.map((entry, index) => (
                    <Cell key={`status-${entry.name}`} fill={chartPalette[index % chartPalette.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {mode === 'track' && (
        <div className="filters-section">
          <div className="search-wrapper" style={{ flex: 1, maxWidth: '400px' }}>
            <div className="search-box" style={{ width: '100%' }}>
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by activity or organizer..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>

          <select className="filter-select" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      )}

      <div className="student-achievement-grid">
        {(mode === 'track' ? filtered : showcaseItems).map((item) => (
          <div className="table-card" style={{ padding: '18px' }} key={item.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>{item.title}</h3>
              <span className={`status-pill ${item.status === 'Verified' ? 'verified' : 'pending'}`}>{item.status}</span>
            </div>
            <p style={{ color: '#64748B', fontSize: '13px', marginBottom: '16px' }}>{item.organizer}</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <span className="student-meta-pill"><Trophy size={14} /> {item.category}</span>
              <span className="student-meta-pill"><Medal size={14} /> {item.level}</span>
              <span className="student-meta-pill"><CalendarDays size={14} /> {item.date}</span>
            </div>
            <div style={{ marginTop: '14px', fontWeight: '700', color: '#6366F1' }}>
              {mode === 'track' ? `+${item.points} pts` : `Portfolio Score: ${item.points}`}
            </div>
          </div>
        ))}
      </div>

      {mode === 'showcase' && (
        <div className="table-card" style={{ marginTop: '24px' }}>
          <div className="table-header">
            <h3 className="table-title">Public Showcase Highlights</h3>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Achievement</th>
                  <th>Category</th>
                  <th>Level</th>
                  <th>Date</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {showcaseItems.slice(0, 5).map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: '600' }}>{item.title}</td>
                      <td>{item.category}</td>
                      <td>{item.level}</td>
                      <td>{item.date}</td>
                      <td style={{ color: '#6366F1', fontWeight: '700' }}>{item.points}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentAchievements
