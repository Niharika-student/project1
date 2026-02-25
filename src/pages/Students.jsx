import { useState } from 'react'
import { Search, Plus, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'

const studentsData = [
  { id: 1, studentId: 'STU-001', name: 'Emily Chen', email: 'emily.chen@school.edu', department: 'Science', year: 'Junior', achievements: 12, joined: '2022-09-01', status: 'Active' },
  { id: 2, studentId: 'STU-002', name: 'Michael Brown', email: 'michael.b@school.edu', department: 'Arts', year: 'Senior', achievements: 8, joined: '2021-09-01', status: 'Active' },
  { id: 3, studentId: 'STU-003', name: 'Sarah Wilson', email: 'sarah.w@school.edu', department: 'Business', year: 'Sophomore', achievements: 9, joined: '2023-09-01', status: 'Active' },
  { id: 4, studentId: 'STU-004', name: 'James Lee', email: 'james.lee@school.edu', department: 'Engineering', year: 'Senior', achievements: 10, joined: '2021-09-01', status: 'Active' },
  { id: 5, studentId: 'STU-005', name: 'Anna Garcia', email: 'anna.g@school.edu', department: 'Medicine', year: 'Junior', achievements: 7, joined: '2022-09-01', status: 'Active' },
  { id: 6, studentId: 'STU-006', name: 'David Kim', email: 'david.kim@school.edu', department: 'Mathematics', year: 'Freshman', achievements: 5, joined: '2024-09-01', status: 'Active' },
  { id: 7, studentId: 'STU-007', name: 'Jessica Taylor', email: 'jessica.t@school.edu', department: 'Law', year: 'Senior', achievements: 6, joined: '2021-09-01', status: 'Active' },
  { id: 8, studentId: 'STU-008', name: 'Robert Martinez', email: 'robert.m@school.edu', department: 'Arts', year: 'Junior', achievements: 8, joined: '2022-09-01', status: 'Inactive' },
  { id: 9, studentId: 'STU-009', name: 'Lisa Anderson', email: 'lisa.a@school.edu', department: 'Science', year: 'Sophomore', achievements: 4, joined: '2023-09-01', status: 'Active' },
  { id: 10, studentId: 'STU-010', name: 'William Thomas', email: 'william.t@school.edu', department: 'Engineering', year: 'Senior', achievements: 11, joined: '2021-09-01', status: 'Active' },
]

const departmentColors = {
  Science: '#6366F1',
  Arts: '#F59E0B',
  Business: '#10B981',
  Engineering: '#9333EA',
  Medicine: '#EF4444',
  Law: '#EC4899',
  Mathematics: '#14B8A6',
}

function Students() {
  const [students, setStudents] = useState(studentsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    department: 'Science',
    year: 'Freshman',
  })
  const itemsPerPage = 8

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = departmentFilter === 'all' || student.department === departmentFilter
    return matchesSearch && matchesDept
  })

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const departments = [...new Set(students.map(s => s.department))]

  const handleAddStudent = () => {
    if (!newStudent.name.trim() || !newStudent.email.trim()) return

    const createdStudent = {
      id: students.length + 1,
      studentId: `STU-${String(students.length + 1).padStart(3, '0')}`,
      name: newStudent.name,
      email: newStudent.email,
      department: newStudent.department,
      year: newStudent.year,
      achievements: 0,
      joined: new Date().toISOString().slice(0, 10),
      status: 'Active',
    }

    setStudents((prev) => [createdStudent, ...prev])
    setShowModal(false)
    setNewStudent({ name: '', email: '', department: 'Science', year: 'Freshman' })
    setPopupMessage(`Student "${createdStudent.name}" added successfully.`)
    setTimeout(() => setPopupMessage(''), 2500)
  }

  return (
    <div className="animate-in">
      {popupMessage && <div className="popup-message success">{popupMessage}</div>}

      {/* Filters */}
      <div className="filters-section">
        <div className="search-wrapper" style={{ flex: 1, maxWidth: '400px' }}>
          <div className="search-box" style={{ width: '100%' }}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search students by name, ID, or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <select 
          className="filter-select" 
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="all">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Add Student
        </button>
      </div>

      {/* Stats */}
      <div className="summary-grid animate-in" style={{ animationDelay: '0.1s', marginBottom: '24px' }}>
        <div className="summary-card">
          <div className="summary-card-label">Total Students</div>
          <div className="summary-card-value" style={{ background: 'linear-gradient(135deg, #6366F1, #818CF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{students.length}</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-label">Active Students</div>
          <div className="summary-card-value" style={{ background: 'linear-gradient(135deg, #10B981, #34D399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{students.filter(s => s.status === 'Active').length}</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-label">Total Achievements</div>
          <div className="summary-card-value" style={{ background: 'linear-gradient(135deg, #F59E0B, #FCD34D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{students.reduce((acc, s) => acc + s.achievements, 0)}</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-label">Avg. Achievements</div>
          <div className="summary-card-value" style={{ background: 'linear-gradient(135deg, #9333EA, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{(students.reduce((acc, s) => acc + s.achievements, 0) / students.length).toFixed(1)}</div>
        </div>
      </div>

      {/* Table */}
      <div className="table-card animate-in" style={{ animationDelay: '0.2s' }}>
        <div className="table-header">
          <h3 className="table-title">All Students</h3>
        </div>
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Year</th>
                <th>Achievements</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student) => (
                <tr key={student.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: '600', color: '#6366F1', fontSize: '13px' }}>{student.studentId}</td>
                  <td>
                    <div className="table-user">
                      <div 
                        className="table-user-avatar" 
                        style={{ background: `linear-gradient(135deg, ${departmentColors[student.department]}, ${departmentColors[student.department]}99)` }}
                      >
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="table-user-info">
                        <h4>{student.name}</h4>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: '#64748B', fontSize: '13px' }}>{student.email}</td>
                  <td>
                    <span style={{ 
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      background: `${departmentColors[student.department]}15`,
                      color: departmentColors[student.department]
                    }}>
                      {student.department}
                    </span>
                  </td>
                  <td style={{ fontWeight: '500' }}>{student.year}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '60px', 
                        height: '8px', 
                        background: '#E2E8F0', 
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{ 
                          width: `${(student.achievements / 12) * 100}%`, 
                          height: '100%', 
                          background: 'linear-gradient(90deg, #6366F1, #10B981)',
                          borderRadius: '4px'
                        }}></div>
                      </div>
                      <span style={{ fontWeight: '600', minWidth: '20px' }}>{student.achievements}</span>
                    </div>
                  </td>
                  <td style={{ color: '#64748B' }}>{student.joined}</td>
                  <td>
                    <span style={{ 
                      color: student.status === 'Active' ? '#10B981' : '#64748B',
                      fontWeight: '600',
                      fontSize: '13px'
                    }}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions-cell">
                      <button className="icon-btn" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="icon-btn" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="icon-btn" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <div className="pagination-info">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
          </div>
          <div className="pagination-controls">
            <button 
              className="pagination-btn" 
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Student</h2>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Student Name</label>
                <input className="form-input" value={newStudent.name} onChange={(event) => setNewStudent((prev) => ({ ...prev, name: event.target.value }))} placeholder="Enter full name" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" value={newStudent.email} onChange={(event) => setNewStudent((prev) => ({ ...prev, email: event.target.value }))} placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <select className="form-select" value={newStudent.department} onChange={(event) => setNewStudent((prev) => ({ ...prev, department: event.target.value }))}>
                  {Object.keys(departmentColors).map((department) => (
                    <option key={department} value={department}>{department}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Year</label>
                <select className="form-select" value={newStudent.year} onChange={(event) => setNewStudent((prev) => ({ ...prev, year: event.target.value }))}>
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddStudent}>Create Student</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Students
