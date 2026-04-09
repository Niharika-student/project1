import { useEffect, useState } from 'react'
import { BadgeCheck, BookOpen } from 'lucide-react'

const COURSE_STORAGE_KEY = 'portal-courses'

const defaultCourses = [
  { id: 1, name: 'Data Structures', category: 'Academic', instructor: 'Dr. A. Kumar', status: 'Available' },
  { id: 2, name: 'Business Communication', category: 'Communication', instructor: 'Prof. R. Mehta', status: 'Available' },
  { id: 3, name: 'Applied Mathematics', category: 'Academic', instructor: 'Dr. S. Rao', status: 'Available' },
]

function CourseRegistration() {
  const [courses, setCourses] = useState([])
  const [message, setMessage] = useState('')

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

  const toggleCourse = (id) => {
    const updated = courses.map((course) => {
      if (course.id !== id) return course
      const nextStatus = course.status === 'Registered' ? 'Available' : 'Registered'
      setMessage(`${course.name} is now ${nextStatus}.`)
      return {
        ...course,
        status: nextStatus,
      }
    })

    persistCourses(updated)
  }

  return (
    <section className="page-stack">
      <div className="page-hero compact">
        <div>
          <p className="landing-kicker">Course Registration</p>
          <h3 className="page-hero-title">Manage registrations with one clear action per row.</h3>
          <p className="page-hero-copy">No clutter, no charts. Just a simple list of courses with working register and drop buttons.</p>
        </div>
        <div className="hero-badges">
          <span><BookOpen size={14} /> Available courses</span>
          <span><BadgeCheck size={14} /> Registered courses</span>
        </div>
      </div>

      <h3 className="section-title">Course Registration</h3>
      {message && <p className="page-message">{message}</p>}
      <div className="summary-grid">
        <article className="summary-card"><p className="summary-card-label">Available</p><p className="summary-card-value">{courses.filter((course) => course.status === 'Available').length}</p></article>
        <article className="summary-card"><p className="summary-card-label">Registered</p><p className="summary-card-value">{courses.filter((course) => course.status === 'Registered').length}</p></article>
        <article className="summary-card"><p className="summary-card-label">Categories</p><p className="summary-card-value">{new Set(courses.map((course) => course.category)).size}</p></article>
        <article className="summary-card"><p className="summary-card-label">Latest Action</p><p className="summary-card-value" style={{ fontSize: '1rem' }}>{message ? 'Updated' : 'Idle'}</p></article>
      </div>
      <div className="table-card">
        <table>
          <thead><tr><th>Course</th><th>Category</th><th>Instructor</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td><span className="badge academic">{course.category || 'General'}</span></td>
                <td>{course.instructor || 'TBA'}</td>
                <td><span className={`status-pill ${course.status === 'Registered' ? 'verified' : 'pending'}`}>{course.status}</span></td>
                <td>
                  <button className="btn btn-secondary" type="button" onClick={() => toggleCourse(course.id)}>
                    {course.status === 'Registered' ? 'Drop' : 'Register'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CourseRegistration
