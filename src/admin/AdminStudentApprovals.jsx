import { useMemo, useState } from 'react'
import { CheckCircle2, Clock3, Filter, Search, XCircle } from 'lucide-react'

const initialRequests = [
  { id: 1, student: 'Lisa Anderson', type: 'Achievement verification', category: 'Academic', status: 'Pending', submittedAt: '2026-04-02' },
  { id: 2, student: 'David Kim', type: 'Course completion update', category: 'Sports', status: 'Pending', submittedAt: '2026-04-03' },
  { id: 3, student: 'Sarah Wilson', type: 'Event participation proof', category: 'Community', status: 'Approved', submittedAt: '2026-03-30' },
  { id: 4, student: 'James Lee', type: 'Leadership certificate upload', category: 'Leadership', status: 'Rejected', submittedAt: '2026-03-28' },
  { id: 5, student: 'Robert Martinez', type: 'Arts showcase verification', category: 'Arts', status: 'Pending', submittedAt: '2026-04-01' },
]

function AdminStudentApprovals() {
  const [requests, setRequests] = useState(initialRequests)
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = useMemo(() => ['All', ...new Set(requests.map((request) => request.category))], [requests])
  const statuses = ['All', 'Pending', 'Approved', 'Rejected']

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const byCategory = categoryFilter === 'All' || request.category === categoryFilter
      const byStatus = statusFilter === 'All' || request.status === statusFilter
      const query = searchTerm.trim().toLowerCase()
      const bySearch =
        !query ||
        request.student.toLowerCase().includes(query) ||
        request.type.toLowerCase().includes(query)

      return byCategory && byStatus && bySearch
    })
  }, [requests, categoryFilter, statusFilter, searchTerm])

  const approvedCount = requests.filter((request) => request.status === 'Approved').length
  const rejectedCount = requests.filter((request) => request.status === 'Rejected').length
  const pendingCount = requests.filter((request) => request.status === 'Pending').length

  const updateStatus = (id, status) => {
    setRequests((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)))
  }

  const formatDate = (value) => {
    return new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <section className="page-stack">
      <div
        style={{
          border: '1px solid #d7deea',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #ffffff, #f4f7fd)',
          padding: '22px',
          boxShadow: '0 10px 30px -24px rgba(15, 30, 55, 0.45)',
          marginBottom: '4px',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <p
            style={{
              margin: 0,
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#2554d6',
            }}
          >
            Approval Center
          </p>
          <h3
            style={{
              margin: '10px 0 8px',
              fontSize: 'clamp(1.35rem, 2.8vw, 2rem)',
              lineHeight: 1.12,
              color: '#0f1a33',
              maxWidth: '820px',
            }}
          >
            Review student requests with a clear and professional workflow.
          </h3>
          <p style={{ margin: 0, color: '#5a677f', fontSize: '1rem' }}>
            Filter, verify, and resolve submissions quickly from one place.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '10px',
          }}
        >
          <article
            style={{
              border: '1px solid #d8f0e1',
              background: '#f4fbf7',
              borderRadius: '14px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <CheckCircle2 size={18} color="#1d7a4e" />
            <div>
              <p style={{ margin: 0, color: '#275842', fontSize: '0.85rem', fontWeight: 600 }}>Approved</p>
              <strong style={{ fontSize: '1.45rem', color: '#12422f' }}>{approvedCount}</strong>
            </div>
          </article>

          <article
            style={{
              border: '1px solid #f0e2cb',
              background: '#fff8ef',
              borderRadius: '14px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Clock3 size={18} color="#99611d" />
            <div>
              <p style={{ margin: 0, color: '#7f551f', fontSize: '0.85rem', fontWeight: 600 }}>Pending</p>
              <strong style={{ fontSize: '1.45rem', color: '#603d14' }}>{pendingCount}</strong>
            </div>
          </article>

          <article
            style={{
              border: '1px solid #f3d9d9',
              background: '#fff5f5',
              borderRadius: '14px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <XCircle size={18} color="#9f2a2a" />
            <div>
              <p style={{ margin: 0, color: '#7f2c2c', fontSize: '0.85rem', fontWeight: 600 }}>Rejected</p>
              <strong style={{ fontSize: '1.45rem', color: '#5b1f1f' }}>{rejectedCount}</strong>
            </div>
          </article>
        </div>
      </div>

      <h3 className="section-title">Student Approval Requests</h3>
      <div className="filters-section" style={{ marginTop: '8px' }}>
        <div className="filter-group" style={{ minWidth: '260px' }}>
          <Search size={16} />
          <input
            className="filter-select"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search student or request"
          />
        </div>
        <div className="filter-group">
          <Filter size={16} />
          <select className="filter-select" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <Clock3 size={16} />
          <select className="filter-select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="summary-grid" style={{ marginBottom: '14px' }}>
        {categories.filter((category) => category !== 'All').map((category) => (
          <section className="summary-card" key={category}>
            <p className="summary-card-label">{category} Requests</p>
            <p className="summary-card-value">{requests.filter((request) => request.category === category).length}</p>
          </section>
        ))}
      </div>

      <div className="table-card">
        <div className="table-header" style={{ border: 0, padding: '12px 14px 8px' }}>
          <h4 className="table-title" style={{ fontSize: '15px' }}>All Requests</h4>
          <span className="badge watch">{filteredRequests.length} results</span>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Request</th>
                <th>Category</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '26px', color: '#6b7280' }}>
                    No requests found for the selected filters.
                  </td>
                </tr>
              )}

              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.student}</td>
                  <td>{request.type}</td>
                  <td>
                    <span className="badge">{request.category}</span>
                  </td>
                  <td>{formatDate(request.submittedAt)}</td>
                  <td>
                    <span className={`badge ${request.status === 'Approved' ? 'low' : request.status === 'Pending' ? 'watch' : 'high'}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="table-actions-cell">
                    <button className="btn btn-secondary" onClick={() => updateStatus(request.id, 'Approved')}>
                      Approve
                    </button>
                    <button className="btn btn-secondary" onClick={() => updateStatus(request.id, 'Rejected')}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default AdminStudentApprovals
