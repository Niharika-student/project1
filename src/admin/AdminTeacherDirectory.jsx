import { useState } from 'react'
import { Edit, Eye, Search, Trash2 } from 'lucide-react'

const initialTeachers = [
  { id: 1, name: 'Dr. Maya Rao', dept: 'Student Affairs', status: 'Available' },
  { id: 2, name: 'Prof. Arun Mehta', dept: 'Sports', status: 'Available' },
]

function AdminTeacherDirectory() {
  const [teachers, setTeachers] = useState(initialTeachers)
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')

  const removeTeacher = (id) => {
    setTeachers((prev) => prev.filter((item) => item.id !== id))
    setMessage(`Teacher record ${id} deleted.`)
  }

  const visibleTeachers = teachers.filter((teacher) => {
    const query = search.toLowerCase()
    return teacher.name.toLowerCase().includes(query) || teacher.dept.toLowerCase().includes(query)
  })

  return (
    <section className="page-stack">
      <div className="section-toolbar">
        <div>
          <h3 className="section-title">Admin Teacher Directory</h3>
          <p className="section-note">Keep teacher records visible, searchable, and easy to update.</p>
        </div>
        <div className="search-box directory-search">
          <Search size={16} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search teacher or department" />
        </div>
      </div>

      {message && <p className="page-message">{message}</p>}
      <div className="table-card">
        <table>
          <thead>
            <tr><th>Name</th><th>Department</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {visibleTeachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.name}</td>
                <td>{teacher.dept}</td>
                <td>{teacher.status}</td>
                <td className="table-actions-cell">
                  <button className="icon-btn" type="button" onClick={() => setMessage(`Viewing ${teacher.name}`)}><Eye size={15} /></button>
                  <button className="icon-btn" type="button" onClick={() => setMessage(`Editing ${teacher.name}`)}><Edit size={15} /></button>
                  <button className="icon-btn" type="button" onClick={() => removeTeacher(teacher.id)}><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminTeacherDirectory
