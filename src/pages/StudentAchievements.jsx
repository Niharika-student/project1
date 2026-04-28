import { useEffect, useMemo, useState } from 'react'
import { Search, Trophy, Medal, CalendarDays, Plus, X } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { createAchievement, fetchAchievements } from '../services/achievementApi'

const myAchievements = [
  {
    id: 1,
    student_name: 'Sarah Wilson',
    category: 'Academic Competition',
    date: '2025-11-15',
    hours: null,
    level: 'State',
    title: 'First Place - State Science Fair',
    student_id: 'STU003',
    description: 'Won first place in state science fair',
    position_award: '1st Place',
    roll_number: null,
  },
  {
    id: 2,
    student_name: 'Sarah Wilson',
    category: 'Academic Competition',
    date: '2025-11-15',
    hours: null,
    level: 'State',
    title: 'First Place - Arts Club',
    student_id: 'STU003',
    description: 'Won first place in arts club competition',
    position_award: '3rd Place',
    roll_number: null,
  },
  {
    id: 3,
    student_name: 'Sarah Wilson',
    category: 'Sports Competition',
    date: '2025-10-22',
    hours: 4,
    level: 'District',
    title: 'District Basketball Finals',
    student_id: 'STU003',
    description: 'Runner-up in district basketball finals',
    position_award: '2nd Place',
    roll_number: 'R203',
  },
]

const categories = ['All', 'Academic Competition', 'Sports Competition', 'Arts Competition', 'Leadership Activity', 'Community Service']

function pointsFromRecord(record) {
  const award = (record.position_award || '').toLowerCase()
  let points = 40
  if (award.includes('1st') || award.includes('first')) points = 100
  if (award.includes('2nd') || award.includes('second')) points = 80
  if (award.includes('3rd') || award.includes('third')) points = 60
  if (award.includes('participation')) points = 30
  if (record.hours) points += Math.min(Number(record.hours) * 2, 20)
  return points
}

function statusFromRecord(record) {
  return record.position_award ? 'Verified' : 'Pending'
}

function StudentAchievements({ mode = 'track', student }) {
  const [records, setRecords] = useState(myAchievements)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')
  const [popupType, setPopupType] = useState('success')

  const profile = {
    name: student?.name || 'Sarah Wilson',
    studentId: 'STU003',
    department: 'Business',
    year: 'Sophomore',
    email: student?.email || 'student@example.com',
  }

  const [newAchievement, setNewAchievement] = useState({
    student_name: '',
    category: '',
    date: '',
    hours: '',
    level: '',
    title: '',
    student_id: '',
    description: '',
    position_award: '',
    roll_number: '',
  })

  const normalizedAchievements = useMemo(() => {
    return records.map((item) => ({
      ...item,
      student_name: item.student_name || profile.name,
      points: pointsFromRecord(item),
      status: statusFromRecord(item),
    }))
  }, [records, profile.name])

  useEffect(() => {
    let active = true

    async function loadAchievements() {
      setLoading(true)
      try {
        const rows = await fetchAchievements()
        if (active && rows.length) {
          const mine = rows.filter((item) => item.student_id === profile.studentId)
          if (mine.length) {
            setRecords(mine)
          }
        }
      } catch {
        if (active) {
          setPopupType('error')
          setPopupMessage('Backend not reachable. Showing local student data.')
          setTimeout(() => setPopupMessage(''), 2500)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadAchievements()

    return () => {
      active = false
    }
  }, [profile.studentId])

  const filtered = useMemo(() => {
    return normalizedAchievements.filter((item) => {
      const bySearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase()) || item.student_id.toLowerCase().includes(searchTerm.toLowerCase())
      const byName = (item.student_name || '').toLowerCase().includes(searchTerm.toLowerCase())
      const byCategory = categoryFilter === 'All' || item.category === categoryFilter
      return (bySearch || byName) && byCategory
    })
  }, [normalizedAchievements, searchTerm, categoryFilter])

  const totalPoints = normalizedAchievements.reduce((sum, item) => sum + item.points, 0)
  const verifiedAchievements = normalizedAchievements.filter((item) => item.status === 'Verified')
  const showcaseItems = [...verifiedAchievements].sort((first, second) => second.points - first.points)

  const handleCreateAchievement = () => {
    if (
      !newAchievement.category ||
      !newAchievement.student_name.trim() ||
      !newAchievement.date ||
      !newAchievement.level ||
      !newAchievement.title.trim() ||
      !newAchievement.student_id.trim() ||
      !newAchievement.description.trim() ||
      !newAchievement.position_award.trim()
    ) {
      setPopupType('error')
      setPopupMessage('Please fill all required database fields.')
      setTimeout(() => setPopupMessage(''), 2500)
      return
    }

    if (newAchievement.hours && (Number.isNaN(Number(newAchievement.hours)) || Number(newAchievement.hours) < 0)) {
      setPopupType('error')
      setPopupMessage('Hours must be empty or a valid number greater than or equal to 0.')
      setTimeout(() => setPopupMessage(''), 2500)
      return
    }

    const payload = {
      student_name: newAchievement.student_name.trim(),
      category: newAchievement.category,
      date: newAchievement.date,
      hours: newAchievement.hours ? Number(newAchievement.hours) : null,
      level: newAchievement.level,
      title: newAchievement.title.trim(),
      student_id: newAchievement.student_id.trim().toUpperCase(),
      description: newAchievement.description.trim(),
      position_award: newAchievement.position_award.trim(),
      roll_number: newAchievement.roll_number.trim() || null,
    }

    try {
      const saved = await createAchievement(payload)
      if (saved.student_id === profile.studentId) {
        setRecords((prev) => [saved, ...prev])
      }
      setShowModal(false)
      setCategoryFilter('All')
      setNewAchievement({
        student_name: '',
        category: '',
        date: '',
        hours: '',
        level: '',
        title: '',
        student_id: '',
        description: '',
        position_award: '',
        roll_number: '',
      })
      setPopupType('success')
      setPopupMessage(`Achievement "${saved.title}" saved to database.`)
      setTimeout(() => setPopupMessage(''), 2500)
    } catch (error) {
      setPopupType('error')
      setPopupMessage(error.message || 'Failed to save achievement in database.')
      setTimeout(() => setPopupMessage(''), 2500)
    }
  }

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
      {popupMessage && <div className={`popup-message ${popupType}`}>{popupMessage}</div>}

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
          <div className="summary-card-value">{mode === 'track' ? normalizedAchievements.length : showcaseItems.length}</div>
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
          <div className="summary-card-value">{new Set(normalizedAchievements.map((item) => item.category)).size}</div>
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

          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            Add Achievement
          </button>
          {loading && <span style={{ color: '#64748B', fontSize: '13px' }}>Loading from DB...</span>}
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
              <span className="student-meta-pill">{item.student_name || profile.name}</span>
              <span className="student-meta-pill"><Trophy size={14} /> {item.category}</span>
              <span className="student-meta-pill"><Medal size={14} /> {item.level}</span>
              <span className="student-meta-pill"><CalendarDays size={14} /> {item.date}</span>
              <span className="student-meta-pill">{item.position_award}</span>
            </div>
            <p style={{ color: '#64748B', fontSize: '13px', marginTop: '12px' }}>{item.description}</p>
            <div style={{ marginTop: '10px', fontWeight: '700', color: '#6366F1' }}>
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
                  <th>Position/Award</th>
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
                      <td>{item.position_award}</td>
                      <td style={{ color: '#6366F1', fontWeight: '700' }}>{item.points}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {mode === 'track' && showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Achievement (DB Format)</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Student Name *</label>
                <input className="form-input" value={newAchievement.student_name} onChange={(event) => setNewAchievement((prev) => ({ ...prev, student_name: event.target.value }))} placeholder="Enter student name" />
              </div>

              <div className="form-group">
                <label className="form-label">Title *</label>
                <input className="form-input" value={newAchievement.title} onChange={(event) => setNewAchievement((prev) => ({ ...prev, title: event.target.value }))} placeholder="Enter achievement title" />
              </div>

              <div className="form-group">
                <label className="form-label">Category *</label>
                <select className="form-select" value={newAchievement.category} onChange={(event) => setNewAchievement((prev) => ({ ...prev, category: event.target.value }))}>
                  <option value="">-- Select Category --</option>
                  <option value="Academic Competition">Academic Competition</option>
                  <option value="Sports Competition">Sports Competition</option>
                  <option value="Arts Competition">Arts Competition</option>
                  <option value="Leadership Activity">Leadership Activity</option>
                  <option value="Community Service">Community Service</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Date *</label>
                <input type="date" className="form-input" value={newAchievement.date} onChange={(event) => setNewAchievement((prev) => ({ ...prev, date: event.target.value }))} />
              </div>

              <div className="form-group">
                <label className="form-label">Hours (nullable)</label>
                <input type="number" className="form-input" value={newAchievement.hours} onChange={(event) => setNewAchievement((prev) => ({ ...prev, hours: event.target.value }))} placeholder="Leave empty if not available" />
              </div>

              <div className="form-group">
                <label className="form-label">Level *</label>
                <select className="form-select" value={newAchievement.level} onChange={(event) => setNewAchievement((prev) => ({ ...prev, level: event.target.value }))}>
                  <option value="">-- Select Level --</option>
                  <option value="College">College</option>
                  <option value="District">District</option>
                  <option value="State">State</option>
                  <option value="National">National</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Student ID *</label>
                <input className="form-input" value={newAchievement.student_id} onChange={(event) => setNewAchievement((prev) => ({ ...prev, student_id: event.target.value }))} placeholder="e.g., STU003" />
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea className="form-textarea" value={newAchievement.description} onChange={(event) => setNewAchievement((prev) => ({ ...prev, description: event.target.value }))} placeholder="Enter description" />
              </div>

              <div className="form-group">
                <label className="form-label">Position/Award *</label>
                <input className="form-input" value={newAchievement.position_award} onChange={(event) => setNewAchievement((prev) => ({ ...prev, position_award: event.target.value }))} placeholder="e.g., 1st Place" />
              </div>

              <div className="form-group">
                <label className="form-label">Roll Number (nullable)</label>
                <input className="form-input" value={newAchievement.roll_number} onChange={(event) => setNewAchievement((prev) => ({ ...prev, roll_number: event.target.value }))} placeholder="e.g., R203" />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreateAchievement}>Save Achievement</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentAchievements
