import { Edit, Plus, Search, Trash2, X } from 'lucide-react'
import { useMemo, useState } from 'react'

const initialRows = [
  ['Emma Johnson', 'STU001', 'First Place - State Science Fair', 'Won first place in the State Science Fair with a pro...', 'Academic Competition', 'State', '11/15/2025', '1st Place'],
  ['Emma Johnson', 'STU001', 'Best Painter Award', 'Received Best Painter Award at the Annual Art Exh...', 'Arts', 'School', '9/20/2025', 'Winner'],
  ['Liam Chen', 'STU002', 'National Basketball Championship', 'Team Captain - Led school basketball team to nati...', 'Sports', 'National', '12/10/2025', 'Champion'],
  ['Liam Chen', 'STU002', 'Student Council President', 'Elected as Student Council President for the acade...', 'Leadership', 'School', '8/1/2025', '-'],
  ['Sophia Martinez', 'STU003', 'International Music Competition', 'Silver medalist in Piano Performance at Internatio...', 'Music', 'International', '10/5/2025', '2nd Place'],
  ['Sophia Martinez', 'STU003', 'Community Service Award', 'Recognized for 200+ hours of community service ...', 'Community Service', 'District', '12/20/2025', '-'],
]

function AdminHome() {
  const [rows, setRows] = useState(initialRows)
  const [search, setSearch] = useState('')
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

  const studentOptions = useMemo(() => {
    const map = new Map()
    rows.forEach((row) => {
      if (!map.has(row[1])) {
        map.set(row[1], row[0])
      }
    })
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }))
  }, [rows])

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) {
      return rows
    }

    return rows.filter((row) => row.join(' ').toLowerCase().includes(query))
  }, [rows, search])

  const categories = useMemo(() => ['All', ...new Set(rows.map((row) => row[4]))], [rows])

  const categoryScopedRows = useMemo(() => {
    if (categoryFilter === 'All') {
      return filteredRows
    }

    return filteredRows.filter((row) => row[4] === categoryFilter)
  }, [filteredRows, categoryFilter])

  const groupedRows = useMemo(() => {
    const grouped = categoryScopedRows.reduce((accumulator, row) => {
      const category = row[4]
      if (!accumulator[category]) {
        accumulator[category] = []
      }
      accumulator[category].push(row)
      return accumulator
    }, {})

    return Object.entries(grouped).map(([category, items]) => ({ category, items }))
  }, [categoryScopedRows])

  const submitAchievement = (event) => {
    event.preventDefault()
    const selectedStudent = studentOptions.find((student) => student.id === achievementForm.studentId)
    if (!selectedStudent || !achievementForm.title || !achievementForm.position || !achievementForm.date) {
      setMessage('Please fill all required achievement fields.')
      return
    }

    const created = [
      selectedStudent.name,
      selectedStudent.id,
      achievementForm.title,
      achievementForm.description || 'Added from Add Achievement form.',
      achievementForm.category,
      achievementForm.level,
      achievementForm.date,
      achievementForm.position,
    ]

    setRows((prev) => [created, ...prev])
    setMessage('New achievement record added successfully.')
    setAchievementForm({
      studentId: selectedStudent.id,
      title: '',
      category: 'Sports',
      level: 'School',
      date: '',
      position: '',
      description: '',
    })
    setShowAddModal(false)
  }

  const editAchievement = (studentId, title) => {
    setRows((prev) => prev.map((row) => {
      if (row[1] === studentId && row[2] === title) {
        return [row[0], row[1], row[2], `${row[3]} (edited)`, row[4], row[5], row[6], row[7]]
      }
      return row
    }))
    setMessage(`Achievement for ${studentId} updated successfully.`)
  }

  const deleteAchievement = (studentId, title) => {
    setRows((prev) => prev.filter((row) => !(row[1] === studentId && row[2] === title)))
    setMessage(`Achievement removed: ${title}.`)
  }

  return (
    <section className="portal-page-stack">
      <div className="portal-page-head">
        <div>
          <h1>Achievements Management</h1>
          <p>Record and manage student achievements</p>
        </div>
        <button className="portal-primary-btn" type="button" onClick={() => setShowAddModal(true)}><Plus size={18} /> Add Achievement</button>
      </div>

      {message && <p className="page-message">{message}</p>}

      <section className="portal-table-wrap">
        <div className="portal-row-between portal-table-head">
          <div>
            <h2>All Achievements</h2>
            <p>Total: {categoryScopedRows.length} achievements</p>
          </div>
          <div className="toolbar-actions">
            <div className="portal-search"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search achievements..." /></div>
            <div className="filter-group">
              <select className="filter-select" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {groupedRows.map((group) => (
          <section key={group.category} style={{ marginTop: '12px' }}>
            <div className="portal-row-between" style={{ marginBottom: '8px' }}>
              <h3 style={{ fontSize: '1.15rem' }}>{group.category}</h3>
              <span className="tag violet">{group.items.length} records</span>
            </div>

            <div className="portal-table-scroll">
              <table className="portal-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Achievement</th>
                    <th>Category</th>
                    <th>Level</th>
                    <th>Date</th>
                    <th>Position</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((row) => (
                    <tr key={`${row[1]}-${row[2]}`}>
                      <td>
                        <strong>{row[0]}</strong>
                        <span>{row[1]}</span>
                      </td>
                      <td>
                        <strong>{row[2]}</strong>
                        <span>{row[3]}</span>
                      </td>
                      <td><span className="tag violet">{row[4]}</span></td>
                      <td>{row[5]}</td>
                      <td>{row[6]}</td>
                      <td>{row[7]}</td>
                      <td className="table-actions-cell">
                        <button className="icon-btn" type="button" onClick={() => editAchievement(row[1], row[2])}><Edit size={16} /></button>
                        <button className="icon-btn danger" type="button" onClick={() => deleteAchievement(row[1], row[2])}><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </section>

      {showAddModal && (
        <div className="portal-modal-overlay" role="dialog" aria-modal="true">
          <form className="portal-modal-card" onSubmit={submitAchievement}>
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

export default AdminHome
