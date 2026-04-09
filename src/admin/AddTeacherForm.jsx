import { useState } from 'react'
import { PlusCircle, School, UserRound } from 'lucide-react'

function AddTeacherForm() {
  const [form, setForm] = useState({ name: '', email: '', department: '' })
  const [teachers, setTeachers] = useState([])
  const [message, setMessage] = useState('')

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const addTeacher = (event) => {
    event.preventDefault()
    if (!form.name || !form.email || !form.department) {
      setMessage('Please enter all teacher details.')
      return
    }

    setTeachers((prev) => [...prev, { ...form, id: prev.length + 1 }])
    setForm({ name: '', email: '', department: '' })
    setMessage('Teacher added successfully.')
  }

  return (
    <section className="page-stack">
      <div className="page-hero compact">
        <div>
          <p className="landing-kicker">Teacher Onboarding</p>
          <h3 className="page-hero-title">Add new teachers with a simple, clear form.</h3>
          <p className="page-hero-copy">The form is designed to be fast to complete and easy to understand.</p>
        </div>
        <div className="hero-badges">
          <span><PlusCircle size={14} /> Add record</span>
          <span><UserRound size={14} /> Name and email</span>
          <span><School size={14} /> Department</span>
        </div>
      </div>

      <h3 className="section-title">Add Teacher Form</h3>
      <form className="auth-card form-card" onSubmit={addTeacher}>
        <input className="form-input" value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Teacher name" />
        <input className="form-input" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="Teacher email" />
        <input className="form-input" value={form.department} onChange={(event) => update('department', event.target.value)} placeholder="Department" />
        {message && <p className="page-message">{message}</p>}
        <button className="btn btn-primary" type="submit">Add Teacher</button>
      </form>

      {teachers.length > 0 && (
        <div className="table-card" style={{ marginTop: '14px' }}>
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Department</th></tr></thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id}><td>{teacher.name}</td><td>{teacher.email}</td><td>{teacher.department}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default AddTeacherForm
