import { useMemo, useState } from 'react'
import { Calendar, Medal, Plus, Trophy, Trash2, X } from 'lucide-react'

const initialAchievements = [
  {
    id: 1,
    level: 'State',
    category: 'Academic Competition',
    badge: '1st Place',
    title: 'First Place - State Science Fair',
    description: 'Won first place in the State Science Fair with a project on renewable energy solutions.',
    date: 'November 15, 2025',
  },
  {
    id: 2,
    level: 'School',
    category: 'Arts',
    badge: 'Winner',
    title: 'Best Painter Award',
    description: 'Received Best Painter Award at the Annual Art Exhibition for creative mural design.',
    date: 'September 20, 2025',
  },
]

const studentOptions = [
  { id: 'STU001', name: 'Emma Johnson' },
  { id: 'STU002', name: 'Liam Chen' },
  { id: 'STU003', name: 'Sophia Martinez' },
]

function StudentHome() {
  const [achievements, setAchievements] = useState(initialAchievements)
  const [hours, setHours] = useState(45)
  const [message, setMessage] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [achievementForm, setAchievementForm] = useState({
    studentId: 'STU001',
    title: '',
    category: 'Sports',
    level: 'School',
    date: '',
    position: '',
    description: '',
  })

  const addAchievement = (event) => {
    event.preventDefault()
    if (!achievementForm.title.trim() || !achievementForm.date || !achievementForm.position.trim()) {
      setMessage('Please fill all required achievement fields.')
      return
    }

    const formattedDate = new Date(achievementForm.date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    const newAchievement = {
      id: Date.now(),
      level: achievementForm.level,
      category: achievementForm.category,
      badge: achievementForm.position,
      title: achievementForm.title,
      description: achievementForm.description || 'Achievement added from student portal form.',
      date: formattedDate,
    }

    setAchievements((prev) => [newAchievement, ...prev])
    setHours((prev) => prev + 5)
    setMessage('New achievement added successfully.')
    setAchievementForm({
      studentId: achievementForm.studentId,
      title: '',
      category: 'Sports',
      level: 'School',
      date: '',
      position: '',
      description: '',
    })
    setShowAddModal(false)
  }

  const deleteAchievement = (id) => {
    setAchievements((prev) => prev.filter((item) => item.id !== id))
    setMessage('Achievement removed successfully.')
  }

  const participationCount = useMemo(() => (achievements.length > 0 ? 1 : 0), [achievements.length])
  const categories = useMemo(() => ['All', ...new Set(achievements.map((item) => item.category))], [achievements])

  const filteredAchievements = useMemo(() => {
    if (categoryFilter === 'All') {
      return achievements
    }

    return achievements.filter((item) => item.category === categoryFilter)
  }, [achievements, categoryFilter])

  const groupedAchievements = useMemo(() => {
    const grouped = filteredAchievements.reduce((accumulator, item) => {
      if (!accumulator[item.category]) {
        accumulator[item.category] = []
      }

      accumulator[item.category].push(item)
      return accumulator
    }, {})

    return Object.entries(grouped).map(([category, items]) => ({ category, items }))
  }, [filteredAchievements])

  return (
    <section className="portal-page-stack">
      <div className="portal-page-head">
        <div>
          <h1>My Achievements &amp; Participation</h1>
          <p>Track and add your extracurricular accomplishments</p>
        </div>
        <button className="portal-primary-btn" type="button" onClick={() => setShowAddModal(true)}><Plus size={18} /> Add Achievement</button>
      </div>

      <div className="portal-stat-grid">
        <article className="portal-stat-card"><h4>Total Achievements</h4><strong>{achievements.length}</strong></article>
        <article className="portal-stat-card"><h4>Active Participations</h4><strong className="ok">{participationCount}</strong></article>
        <article className="portal-stat-card"><h4>Total Hours Contributed</h4><strong>{hours}</strong></article>
      </div>

      <div className="portal-tab-strip">
        <span><Trophy size={17} /> My Achievements ({achievements.length})</span>
        <span><Medal size={17} /> Participations ({participationCount})</span>
      </div>

      <div className="filters-section" style={{ marginTop: '4px' }}>
        <div className="filter-group">
          <Trophy size={16} />
          <select className="filter-select" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="summary-grid" style={{ marginBottom: '4px' }}>
        {categories.filter((category) => category !== 'All').map((category) => (
          <section className="summary-card" key={category}>
            <p className="summary-card-label">{category}</p>
            <p className="summary-card-value">{achievements.filter((item) => item.category === category).length}</p>
          </section>
        ))}
      </div>

      {message && <p className="page-message">{message}</p>}

      {groupedAchievements.map((group) => (
        <section key={group.category} className="portal-table-wrap" style={{ padding: '14px' }}>
          <div className="portal-row-between" style={{ marginBottom: '10px' }}>
            <h3 style={{ fontSize: '1.2rem' }}>{group.category}</h3>
            <span className="tag violet">{group.items.length} records</span>
          </div>

          {group.items.map((item) => (
            <article className="portal-achievement-card" key={item.id} style={{ marginBottom: '10px' }}>
              <div className="portal-row-between">
                <div className="portal-tag-row">
                  <span className="dot" />
                  <span className="tag blue">{item.level}</span>
                  <span className="tag violet">{item.category}</span>
                </div>
                <span className="tag gold">{item.badge}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="portal-row-between">
                <span className="portal-date"><Calendar size={18} /> {item.date}</span>
                <button className="portal-danger-btn" type="button" onClick={() => deleteAchievement(item.id)}><Trash2 size={17} /> Delete</button>
              </div>
            </article>
          ))}
        </section>
      ))}

      <article className="portal-achievement-card muted">
        <h3>Participation Showcase</h3>
        <p>Active in eco-club campaigns with 45 total service hours and event coordination support.</p>
      </article>

      {showAddModal && (
        <div className="portal-modal-overlay" role="dialog" aria-modal="true">
          <form className="portal-modal-card" onSubmit={addAchievement}>
            <div className="portal-modal-header">
              <div>
                <h3>Add New Achievement</h3>
                <p>Record a new student achievement</p>
              </div>
              <button className="portal-modal-close" type="button" onClick={() => setShowAddModal(false)}><X size={20} /></button>
            </div>

            <label>Student *</label>
            <select value={achievementForm.studentId} onChange={(event) => setAchievementForm((prev) => ({ ...prev, studentId: event.target.value }))}>
              {studentOptions.map((student) => (
                <option key={student.id} value={student.id}>{student.name} ({student.id})</option>
              ))}
            </select>

            <label>Achievement Title *</label>
            <input value={achievementForm.title} onChange={(event) => setAchievementForm((prev) => ({ ...prev, title: event.target.value }))} placeholder="e.g., First Place - State Science Fair" />

            <div className="portal-modal-grid-2">
              <div>
                <label>Category *</label>
                <select value={achievementForm.category} onChange={(event) => setAchievementForm((prev) => ({ ...prev, category: event.target.value }))}>
                  <option>Sports</option>
                  <option>Arts</option>
                  <option>Academic Competition</option>
                  <option>Leadership</option>
                  <option>Community Service</option>
                </select>
              </div>
              <div>
                <label>Level *</label>
                <select value={achievementForm.level} onChange={(event) => setAchievementForm((prev) => ({ ...prev, level: event.target.value }))}>
                  <option>School</option>
                  <option>District</option>
                  <option>State</option>
                  <option>National</option>
                  <option>International</option>
                </select>
              </div>
            </div>

            <div className="portal-modal-grid-2">
              <div>
                <label>Date *</label>
                <input type="date" value={achievementForm.date} onChange={(event) => setAchievementForm((prev) => ({ ...prev, date: event.target.value }))} />
              </div>
              <div>
                <label>Position/Award *</label>
                <input value={achievementForm.position} onChange={(event) => setAchievementForm((prev) => ({ ...prev, position: event.target.value }))} placeholder="e.g., 1st Place, Winner" />
              </div>
            </div>

            <label>Description</label>
            <textarea value={achievementForm.description} onChange={(event) => setAchievementForm((prev) => ({ ...prev, description: event.target.value }))} placeholder="Describe the achievement..." />

            <div className="portal-modal-actions">
              <button className="portal-secondary-btn" type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="portal-primary-btn" type="submit">Add Achievement</button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}

export default StudentHome
