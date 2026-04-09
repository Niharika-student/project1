import { useState } from 'react'
import { Edit, Eye, Plus, Search, Trash2, X } from 'lucide-react'

const initialStudents = [
  { id: 1, name: 'Emily Chen', email: 'emily@school.edu', roll: 'STU001', grade: '10th Grade', status: 'Active' },
  { id: 2, name: 'Michael Brown', email: 'michael@school.edu', roll: 'STU002', grade: '11th Grade', status: 'Active' },
  { id: 3, name: 'Sarah Wilson', email: 'sarah@school.edu', roll: 'STU003', grade: '9th Grade', status: 'Pending' },
]

function AdminStudentDirectory() {
  const [students, setStudents] = useState(initialStudents)
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [studentForm, setStudentForm] = useState({ name: '', email: '', roll: '', grade: '' })

  const act = (type, id) => {
    setStudents((prev) => prev.map((item) => (item.id === id ? { ...item, status: type === 'delete' ? 'Removed' : item.status } : item)))
    const labels = { view: 'Viewed student', edit: 'Edited student', delete: 'Removed student' }
    setMessage(`${labels[type]} (ID ${id}) successfully.`)
  }

  const visibleStudents = students.filter((student) => {
    const query = search.toLowerCase()
    return (
      student.name.toLowerCase().includes(query)
      || student.email.toLowerCase().includes(query)
      || student.roll.toLowerCase().includes(query)
      || student.grade.toLowerCase().includes(query)
    )
  })

  const addStudent = (event) => {
    event.preventDefault()
    if (!studentForm.name || !studentForm.email || !studentForm.roll || !studentForm.grade) {
      setMessage('Please fill all student details before adding.')
      return
    }

    const created = {
      id: Date.now(),
      name: studentForm.name,
      email: studentForm.email,
      roll: studentForm.roll.toUpperCase(),
      grade: studentForm.grade,
      status: 'Active',
    }

    setStudents((prev) => [created, ...prev])
    setStudentForm({ name: '', email: '', roll: '', grade: '' })
    setShowModal(false)
    setMessage(`Student ${created.name} added successfully.`)
  }

  return (
    <section className="page-stack">
      <div className="section-toolbar">
        <div>
          <h3 className="section-title">Admin Student Directory</h3>
          <p className="section-note">Search, review, and maintain student records from a compact table layout.</p>
        </div>
        <div className="toolbar-actions">
          <div className="search-box directory-search">
            <Search size={16} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search students, roll, or grade" />
          </div>
          <button className="portal-primary-btn" type="button" onClick={() => setShowModal(true)}><Plus size={16} /> Add Student</button>
        </div>
      </div>

      {message && <p className="page-message">{message}</p>}
      <div className="summary-grid">
        <article className="summary-card"><p className="summary-card-label">Visible Students</p><p className="summary-card-value">{visibleStudents.length}</p></article>
        <article className="summary-card"><p className="summary-card-label">Active</p><p className="summary-card-value">{visibleStudents.filter((student) => student.status === 'Active').length}</p></article>
        <article className="summary-card"><p className="summary-card-label">Pending</p><p className="summary-card-value">{visibleStudents.filter((student) => student.status === 'Pending').length}</p></article>
        <article className="summary-card"><p className="summary-card-label">Removed</p><p className="summary-card-value">{visibleStudents.filter((student) => student.status === 'Removed').length}</p></article>
      </div>
      <div className="table-card portal-table-wrap">
        <table className="portal-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Roll Number</th><th>Grade</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {visibleStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.roll}</td>
                <td>{student.grade}</td>
                <td>{student.status}</td>
                <td className="table-actions-cell">
                  <button className="icon-btn" type="button" onClick={() => act('view', student.id)}><Eye size={15} /></button>
                  <button className="icon-btn" type="button" onClick={() => act('edit', student.id)}><Edit size={15} /></button>
                  <button className="icon-btn" type="button" onClick={() => act('delete', student.id)}><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="portal-modal-overlay" role="dialog" aria-modal="true">
          <form className="portal-modal-card" onSubmit={addStudent}>
            <div className="portal-modal-header">
              <div>
                <h3>Add New Student</h3>
                <p>Register a new student in the system</p>
              </div>
              <button className="portal-modal-close" type="button" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <label>Full Name *</label>
            <input value={studentForm.name} onChange={(event) => setStudentForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="e.g., John Smith" />

            <label>Email *</label>
            <input type="email" value={studentForm.email} onChange={(event) => setStudentForm((prev) => ({ ...prev, email: event.target.value }))} placeholder="student@school.edu" />

            <label>Roll Number *</label>
            <input value={studentForm.roll} onChange={(event) => setStudentForm((prev) => ({ ...prev, roll: event.target.value }))} placeholder="e.g., STU001" />

            <label>Grade *</label>
            <input value={studentForm.grade} onChange={(event) => setStudentForm((prev) => ({ ...prev, grade: event.target.value }))} placeholder="e.g., 10th Grade" />

            <div className="portal-modal-actions">
              <button className="portal-secondary-btn" type="button" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="portal-primary-btn" type="submit">Add Student</button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}

export default AdminStudentDirectory
