import { useState } from 'react'
import { Download, Filter, Eye, Edit, Trash2, ChevronLeft, ChevronRight, FileSpreadsheet } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { chartTooltipStyle } from '../utils/chartTooltip'

const reportsData = [
  { id: 1, studentId: 'STU-001', student: 'Emily Chen', achievement: 'Science Fair Winner', category: 'Academic', department: 'Science', date: '2024-01-15', status: 'Approved' },
  { id: 2, studentId: 'STU-002', student: 'Michael Brown', achievement: 'Basketball Championship', category: 'Sports', department: 'Athletics', date: '2024-01-14', status: 'Approved' },
  { id: 3, studentId: 'STU-003', student: 'Sarah Wilson', achievement: 'Art Exhibition', category: 'Arts', department: 'Arts', date: '2024-01-13', status: 'Pending' },
  { id: 4, studentId: 'STU-004', student: 'James Lee', achievement: 'Student Council President', category: 'Leadership', department: 'Student Council', date: '2024-01-12', status: 'Approved' },
  { id: 5, studentId: 'STU-005', student: 'Anna Garcia', achievement: 'Community Service Award', category: 'Community', department: 'Community Service', date: '2024-01-11', status: 'Approved' },
  { id: 6, studentId: 'STU-006', student: 'David Kim', achievement: 'Math Olympiad', category: 'Academic', department: 'Mathematics', date: '2024-01-10', status: 'Approved' },
  { id: 7, studentId: 'STU-007', student: 'Jessica Taylor', achievement: 'Swimming Competition', category: 'Sports', department: 'Athletics', date: '2024-01-09', status: 'Pending' },
  { id: 8, studentId: 'STU-008', student: 'Robert Martinez', achievement: 'Music Concert', category: 'Arts', department: 'Music', date: '2024-01-08', status: 'Approved' },
  { id: 9, studentId: 'STU-009', student: 'Lisa Anderson', achievement: 'Debate Championship', category: 'Leadership', department: 'Debate Club', date: '2024-01-07', status: 'Approved' },
  { id: 10, studentId: 'STU-010', student: 'William Thomas', achievement: 'Volunteer Program', category: 'Community', department: 'Community Service', date: '2024-01-06', status: 'Approved' },
]

const monthlyReportData = [
  { month: 'Jan', academic: 45, sports: 32, arts: 25, leadership: 18, community: 15 },
  { month: 'Feb', academic: 52, sports: 38, arts: 28, leadership: 22, community: 18 },
  { month: 'Mar', academic: 48, sports: 42, arts: 35, leadership: 25, community: 20 },
  { month: 'Apr', academic: 55, sports: 35, arts: 30, leadership: 28, community: 22 },
  { month: 'May', academic: 60, sports: 48, arts: 32, leadership: 30, community: 25 },
  { month: 'Jun', academic: 58, sports: 52, arts: 38, leadership: 32, community: 28 },
]

function Reports() {
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredData = reportsData.filter(item => {
    if (categoryFilter !== 'all' && item.category.toLowerCase() !== categoryFilter) return false
    if (statusFilter !== 'all' && item.status.toLowerCase() !== statusFilter) return false
    if (dateFrom && item.date < dateFrom) return false
    if (dateTo && item.date > dateTo) return false
    return true
  })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const exportToCSV = () => {
    const headers = ['Student ID', 'Student Name', 'Achievement', 'Category', 'Department', 'Date', 'Status']
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => 
        [row.studentId, row.student, row.achievement, row.category, row.department, row.date, row.status].join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'achievements_report.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const summaryStats = [
    { label: 'Total Records', value: filteredData.length, color: '#6366F1' },
    { label: 'Approved', value: filteredData.filter(r => r.status === 'Approved').length, color: '#10B981' },
    { label: 'Pending', value: filteredData.filter(r => r.status === 'Pending').length, color: '#F59E0B' },
    { label: 'Categories', value: [...new Set(filteredData.map(r => r.category))].length, color: '#9333EA' },
  ]

  return (
    <div className="animate-in">
      {/* Summary Cards */}
      <div className="summary-grid">
        {summaryStats.map((stat, index) => (
          <div className="summary-card" key={index}>
            <div className="summary-card-label">{stat.label}</div>
            <div className="summary-card-value" style={{ 
              background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="chart-card animate-in" style={{ animationDelay: '0.1s', marginBottom: '24px' }}>
        <div className="chart-card-header">
          <h3 className="chart-card-title">Monthly Achievement Distribution</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyReportData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="month" stroke="#64748B" fontSize={12} axisLine={false} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={12} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ 
                ...chartTooltipStyle,
                borderRadius: '12px',
              }}
            />
            <Legend iconType="circle" iconSize={8} />
            <Bar dataKey="academic" fill="#6366F1" name="Academic" radius={[6, 6, 0, 0]} />
            <Bar dataKey="sports" fill="#10B981" name="Sports" radius={[6, 6, 0, 0]} />
            <Bar dataKey="arts" fill="#F59E0B" name="Arts" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <Filter size={18} color="#64748B" />
          <select 
            className="filter-select" 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="academic">Academic</option>
            <option value="sports">Sports</option>
            <option value="arts">Arts</option>
            <option value="leadership">Leadership</option>
            <option value="community">Community</option>
          </select>
        </div>
        
        <div className="filter-group">
          <select 
            className="filter-select" 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        
        <div className="filter-group">
          <input 
            type="date" 
            className="date-input"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            placeholder="From Date"
          />
        </div>
        
        <div className="filter-group">
          <input 
            type="date" 
            className="date-input"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            placeholder="To Date"
          />
        </div>
        
        <button className="btn btn-primary" onClick={exportToCSV}>
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="table-card animate-in" style={{ animationDelay: '0.2s' }}>
        <div className="table-header">
          <h3 className="table-title">Achievement Reports</h3>
        </div>
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Achievement</th>
                <th>Category</th>
                <th>Department</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr key={row.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: '600', color: '#6366F1' }}>{row.studentId}</td>
                  <td>
                    <div className="table-user">
                      <div className="table-user-avatar" style={{ background: 'linear-gradient(135deg, #6366F1, #818CF8)' }}>
                        {row.student.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="table-user-info">
                        <h4>{row.student}</h4>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: '500' }}>{row.achievement}</td>
                  <td>
                    <span className={`badge ${row.category.toLowerCase()}`}>
                      {row.category}
                    </span>
                  </td>
                  <td style={{ color: '#64748B' }}>{row.department}</td>
                  <td style={{ color: '#64748B' }}>{row.date}</td>
                  <td>
                    <span style={{ 
                      color: row.status === 'Approved' ? '#10B981' : '#F59E0B',
                      fontWeight: '600',
                      fontSize: '13px'
                    }}>
                      {row.status}
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
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
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
    </div>
  )
}

export default Reports
