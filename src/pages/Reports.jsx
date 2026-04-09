import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Download, Filter, Search } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const reportsData = [
  { id: 1, studentId: 'STU-001', student: 'Emily Chen', achievement: 'Science Fair Winner', category: 'Academic', department: 'Science', date: '2026-03-15', status: 'Approved' },
  { id: 2, studentId: 'STU-002', student: 'Michael Brown', achievement: 'Basketball Championship', category: 'Sports', department: 'Athletics', date: '2026-03-14', status: 'Approved' },
  { id: 3, studentId: 'STU-003', student: 'Sarah Wilson', achievement: 'Art Exhibition', category: 'Arts', department: 'Arts', date: '2026-03-13', status: 'Pending' },
  { id: 4, studentId: 'STU-004', student: 'James Lee', achievement: 'Student Council President', category: 'Leadership', department: 'Student Council', date: '2026-03-12', status: 'Approved' },
  { id: 5, studentId: 'STU-005', student: 'Anna Garcia', achievement: 'Community Service Award', category: 'Community', department: 'Community Service', date: '2026-03-11', status: 'Approved' },
  { id: 6, studentId: 'STU-006', student: 'David Kim', achievement: 'Math Olympiad', category: 'Academic', department: 'Mathematics', date: '2026-03-10', status: 'Approved' },
  { id: 7, studentId: 'STU-007', student: 'Jessica Taylor', achievement: 'Swimming Competition', category: 'Sports', department: 'Athletics', date: '2026-03-09', status: 'Pending' },
  { id: 8, studentId: 'STU-008', student: 'Robert Martinez', achievement: 'Music Concert', category: 'Arts', department: 'Music', date: '2026-03-08', status: 'Approved' },
  { id: 9, studentId: 'STU-009', student: 'Lisa Anderson', achievement: 'Debate Championship', category: 'Leadership', department: 'Debate Club', date: '2026-03-07', status: 'Approved' },
  { id: 10, studentId: 'STU-010', student: 'William Thomas', achievement: 'Volunteer Program', category: 'Community', department: 'Community Service', date: '2026-03-06', status: 'Approved' },
]

function Reports() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5

  const filteredData = useMemo(() => {
    return reportsData.filter((item) => {
      const bySearch =
        item.student.toLowerCase().includes(search.toLowerCase()) ||
        item.studentId.toLowerCase().includes(search.toLowerCase()) ||
        item.achievement.toLowerCase().includes(search.toLowerCase())
      const byCategory = categoryFilter === 'all' || item.category.toLowerCase() === categoryFilter
      const byStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter
      return bySearch && byCategory && byStatus
    })
  }, [search, categoryFilter, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage))
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [search, categoryFilter, statusFilter])

  const summaryStats = [
    { label: 'Filtered Records', value: filteredData.length },
    { label: 'Approved', value: filteredData.filter((item) => item.status === 'Approved').length },
    { label: 'Pending', value: filteredData.filter((item) => item.status === 'Pending').length },
    { label: 'Departments', value: new Set(filteredData.map((item) => item.department)).size },
  ]

  const categoryTotals = useMemo(() => {
    const totals = filteredData.reduce((accumulator, item) => {
      accumulator[item.category] = (accumulator[item.category] || 0) + 1
      return accumulator
    }, {})

    return Object.entries(totals).map(([category, records]) => ({ category, records }))
  }, [filteredData])

  const statusByCategory = useMemo(() => {
    const grouped = filteredData.reduce((accumulator, item) => {
      if (!accumulator[item.category]) {
        accumulator[item.category] = { category: item.category, Approved: 0, Pending: 0 }
      }

      accumulator[item.category][item.status] += 1
      return accumulator
    }, {})

    return Object.values(grouped)
  }, [filteredData])

  const categoryColors = ['#4F46E5', '#06B6D4', '#16A34A', '#EA580C', '#D946EF', '#F59E0B']

  const groupedCategoryRows = useMemo(() => {
    const grouped = filteredData.reduce((accumulator, item) => {
      if (!accumulator[item.category]) {
        accumulator[item.category] = []
      }
      accumulator[item.category].push(item)
      return accumulator
    }, {})

    return Object.entries(grouped)
      .map(([category, rows]) => ({ category, rows }))
      .sort((first, second) => second.rows.length - first.rows.length)
  }, [filteredData])

  const exportCsv = () => {
    const headers = ['Student ID', 'Student', 'Achievement', 'Category', 'Department', 'Date', 'Status']
    const body = filteredData.map((row) =>
      [row.studentId, row.student, row.achievement, row.category, row.department, row.date, row.status].join(',')
    )
    const blob = new Blob([[headers.join(','), ...body].join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'verification-report.csv'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="animate-in">
      <div className="summary-grid">
        {summaryStats.map((stat) => (
          <section className="summary-card" key={stat.label}>
            <p className="summary-card-label">{stat.label}</p>
            <p className="summary-card-value">{stat.value}</p>
          </section>
        ))}
      </div>

      <div className="filters-section">
        <div className="search-box report-search">
          <Search size={16} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search student, ID, or achievement" />
        </div>

        <div className="filter-group">
          <Filter size={16} />
          <select className="filter-select" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            <option value="all">All categories</option>
            <option value="academic">Academic</option>
            <option value="sports">Sports</option>
            <option value="arts">Arts</option>
            <option value="leadership">Leadership</option>
            <option value="community">Community</option>
          </select>
        </div>

        <select className="filter-select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="all">All status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>

        <button className="btn btn-primary" onClick={exportCsv}>
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="charts-grid" style={{ marginBottom: '16px' }}>
        <section className="table-card chart-panel">
          <div className="table-header">
            <h3 className="table-title">Records Per Category</h3>
          </div>
          <div className="chart-canvas">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryTotals}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="records" radius={[6, 6, 0, 0]}>
                  {categoryTotals.map((entry, index) => (
                    <Cell key={`${entry.category}-bar`} fill={categoryColors[index % categoryColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="table-card chart-panel">
          <div className="table-header">
            <h3 className="table-title">Category Status Breakdown</h3>
          </div>
          <div className="chart-canvas">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Approved" stackId="status" fill="#16A34A" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Pending" stackId="status" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="table-card">
        <div className="table-header">
          <h3 className="table-title">Verification Report Table</h3>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Achievement</th>
                <th>Category</th>
                <th>Department</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="table-user">
                      <div className="table-user-avatar">{row.student.split(' ').map((word) => word[0]).join('')}</div>
                      <div className="table-user-info">
                        <h4>{row.student}</h4>
                        <p>{row.studentId}</p>
                      </div>
                    </div>
                  </td>
                  <td>{row.achievement}</td>
                  <td>
                    <span className={`badge ${row.category.toLowerCase()}`}>{row.category}</span>
                  </td>
                  <td>{row.department}</td>
                  <td>{row.date}</td>
                  <td>
                    <span className={`status-pill ${row.status === 'Approved' ? 'verified' : 'pending'}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <p className="pagination-info">
            Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length}
          </p>
          <div className="pagination-controls">
            <button className="pagination-btn" onClick={() => setCurrentPage((value) => value - 1)} disabled={currentPage === 1}>
              <ChevronLeft size={16} />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button key={index + 1} className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`} onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            ))}
            <button className="pagination-btn" onClick={() => setCurrentPage((value) => value + 1)} disabled={currentPage === totalPages}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="table-card" style={{ marginTop: '16px' }}>
        <div className="table-header">
          <h3 className="table-title">Category-Wise Report Division</h3>
        </div>

        <div className="category-report-grid">
          {groupedCategoryRows.map((group) => (
            <article className="category-report-card" key={group.category}>
              <div className="category-report-head">
                <span className={`badge ${group.category.toLowerCase()}`}>{group.category}</span>
                <strong>{group.rows.length} records</strong>
              </div>

              <div className="category-report-list">
                {group.rows.map((row) => (
                  <div key={row.id} className="category-report-item">
                    <div>
                      <h4>{row.student}</h4>
                      <p>{row.achievement}</p>
                    </div>
                    <span className={`status-pill ${row.status === 'Approved' ? 'verified' : 'pending'}`}>{row.status}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Reports
