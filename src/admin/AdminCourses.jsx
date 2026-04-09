import { useEffect, useMemo, useState } from 'react'
import { BookOpen, PlusCircle, Search, Tags } from 'lucide-react'

const COURSE_STORAGE_KEY = 'portal-courses'

const defaultCourses = [
  { id: 1, name: 'Data Structures', category: 'Academic', instructor: 'Dr. A. Kumar', status: 'Available' },
  { id: 2, name: 'Business Communication', category: 'Communication', instructor: 'Prof. R. Mehta', status: 'Available' },
  { id: 3, name: 'Applied Mathematics', category: 'Academic', instructor: 'Dr. S. Rao', status: 'Available' },
]

function AdminCourses() {
  const [courses, setCourses] = useState([])
  const [message, setMessage] = useState('')
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [form, setForm] = useState({
    name: '',
    category: 'Academic',
    instructor: '',
  })

  useEffect(() => {
    const savedCourses = localStorage.getItem(COURSE_STORAGE_KEY)
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses))
      return
    }

    setCourses(defaultCourses)
    localStorage.setItem(COURSE_STORAGE_KEY, JSON.stringify(defaultCourses))
  }, [])

  const persistCourses = (nextCourses) => {
    setCourses(nextCourses)
    localStorage.setItem(COURSE_STORAGE_KEY, JSON.stringify(nextCourses))
  }

  const addCourse = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.instructor.trim()) {
      setMessage('Please enter course name and instructor.')
      return
    }

    const newCourse = {
      id: Date.now(),
      name: form.name.trim(),
      category: form.category,
      instructor: form.instructor.trim(),
      status: 'Available',
    }

    const updated = [newCourse, ...courses]
    persistCourses(updated)
    setForm({ name: '', category: 'Academic', instructor: '' })
    setMessage('Course added successfully. Students can view it now.')
  }

  const categoryCount = useMemo(() => new Set(courses.map((course) => course.category)).size, [courses])
  const categories = useMemo(() => ['All', ...new Set(courses.map((course) => course.category))], [courses])
  const visibleCourses = useMemo(() => {
    const query = search.trim().toLowerCase()
    return courses.filter((course) => {
      const categoryMatches = categoryFilter === 'All' || course.category === categoryFilter
      const queryMatches = !query
        || course.name.toLowerCase().includes(query)
        || course.instructor.toLowerCase().includes(query)
        || course.category.toLowerCase().includes(query)
      return categoryMatches && queryMatches
    })
  }, [courses, search, categoryFilter])
  const availableCount = useMemo(() => courses.filter((course) => course.status === 'Available').length, [courses])

  return (
    <section className="page-stack">
      <div className="page-hero compact">
        <div>
          <p className="landing-kicker">Courses</p>
          <h3 className="page-hero-title">Create course catalog for student registration.</h3>
          <p className="page-hero-copy">Any course added here is visible in the student portal course registration page.</p>
        </div>
        <div className="hero-badges">
          <span><BookOpen size={14} /> Total courses: {courses.length}</span>
          <span><Tags size={14} /> Categories: {categoryCount}</span>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <p className="summary-card-label">Total Courses</p>
          <p className="summary-card-value">{courses.length}</p>
        </article>
        <article className="summary-card">
          <p className="summary-card-label">Available</p>
          <p className="summary-card-value">{availableCount}</p>
        </article>
        <article className="summary-card">
          <p className="summary-card-label">Categories</p>
          <p className="summary-card-value">{categoryCount}</p>
        </article>
        <article className="summary-card">
          <p className="summary-card-label">Visible Records</p>
          <p className="summary-card-value">{visibleCourses.length}</p>
        </article>
      </div>

      <div className="courses-admin-grid">
        <div className="table-card">
          <div className="table-header">
            <h3 className="table-title">Add Course</h3>
          </div>
          <form className="courses-form" onSubmit={addCourse}>
            <input className="form-input" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="Course name" />
            <select className="form-select" value={form.category} onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}>
              <option>Academic</option>
              <option>Communication</option>
              <option>Technology</option>
              <option>Leadership</option>
              <option>Community</option>
            </select>
            <input className="form-input" value={form.instructor} onChange={(event) => setForm((prev) => ({ ...prev, instructor: event.target.value }))} placeholder="Instructor name" />
            {message && <p className="page-message">{message}</p>}
            <button className="btn btn-primary" type="submit"><PlusCircle size={16} /> Add Course</button>
          </form>
        </div>

        <div className="table-card" style={{ marginTop: '0' }}>
          <div className="table-header">
            <h3 className="table-title">Course Directory</h3>
            <div className="courses-filter-row">
              <div className="search-box">
                <Search size={16} />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search course or instructor" />
              </div>
              <select className="filter-select" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr><th>Course</th><th>Category</th><th>Instructor</th><th>Status</th></tr>
              </thead>
              <tbody>
                {visibleCourses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.name}</td>
                    <td><span className="badge academic">{course.category}</span></td>
                    <td>{course.instructor}</td>
                    <td><span className={`status-pill ${course.status === 'Registered' ? 'verified' : 'pending'}`}>{course.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminCourses