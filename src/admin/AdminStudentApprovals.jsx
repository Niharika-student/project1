import { useMemo, useState } from 'react'
import { CheckCircle2, Filter, XCircle } from 'lucide-react'

const initialRequests = [
  { id: 1, student: 'Lisa Anderson', type: 'Achievement verification', category: 'Academic', status: 'Pending' },
  { id: 2, student: 'David Kim', type: 'Course completion update', category: 'Sports', status: 'Pending' },
  { id: 3, student: 'Sarah Wilson', type: 'Event participation proof', category: 'Community', status: 'Approved' },
  { id: 4, student: 'James Lee', type: 'Leadership certificate upload', category: 'Leadership', status: 'Rejected' },
  { id: 5, student: 'Robert Martinez', type: 'Arts showcase verification', category: 'Arts', status: 'Pending' },
]

function AdminStudentApprovals() {
  const [requests, setRequests] = useState(initialRequests)
  const [categoryFilter, setCategoryFilter] = useState('All')

  const categories = useMemo(() => ['All', ...new Set(requests.map((request) => request.category))], [requests])

  const filteredRequests = useMemo(() => {
    if (categoryFilter === 'All') {
      return requests
    }

    return requests.filter((request) => request.category === categoryFilter)
  }, [requests, categoryFilter])

  const approvedCount = requests.filter((request) => request.status === 'Approved').length
  const rejectedCount = requests.filter((request) => request.status === 'Rejected').length
  const pendingCount = requests.filter((request) => request.status === 'Pending').length

  const groupedByCategory = useMemo(() => {
    const grouped = filteredRequests.reduce((accumulator, request) => {
      if (!accumulator[request.category]) {
        accumulator[request.category] = []
      }

      accumulator[request.category].push(request)
      return accumulator
    }, {})

    return Object.entries(grouped).map(([category, categoryRequests]) => ({
      category,
      requests: categoryRequests,
    }))
  }, [filteredRequests])

  const updateStatus = (id, status) => {
    setRequests((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)))
  }

  return (
    <section className="page-stack">
      <div className="page-hero compact approvals-hero">
        <div>
          <p className="landing-kicker approvals-kicker">Approvals</p>
          <h3 className="page-hero-title">Approve or reject student requests with clear actions.</h3>
          <p className="page-hero-copy">This area keeps requests readable, compact, and easy to process.</p>
        </div>
        <div className="approval-kpi-grid">
          <article className="approval-kpi-card approved">
            <div className="approval-kpi-icon"><CheckCircle2 size={16} /></div>
            <div>
              <p>Approved</p>
              <strong>{approvedCount}</strong>
            </div>
          </article>
          <article className="approval-kpi-card pending">
            <div className="approval-kpi-icon"><Filter size={16} /></div>
            <div>
              <p>Pending</p>
              <strong>{pendingCount}</strong>
            </div>
          </article>
          <article className="approval-kpi-card rejected">
            <div className="approval-kpi-icon"><XCircle size={16} /></div>
            <div>
              <p>Rejected</p>
              <strong>{rejectedCount}</strong>
            </div>
          </article>
        </div>
      </div>

      <h3 className="section-title">Admin Student Approvals</h3>
      <div className="filters-section" style={{ marginTop: '6px' }}>
        <div className="filter-group">
          <Filter size={16} />
          <select className="filter-select" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="summary-grid" style={{ marginBottom: '16px' }}>
        {categories.filter((category) => category !== 'All').map((category) => (
          <section className="summary-card" key={category}>
            <p className="summary-card-label">{category} Requests</p>
            <p className="summary-card-value">{requests.filter((request) => request.category === category).length}</p>
          </section>
        ))}
      </div>

      <div className="table-card">
        {groupedByCategory.map((group) => (
          <section key={group.category} style={{ padding: '10px 14px' }}>
            <div className="table-header" style={{ border: 0, padding: '8px 0 10px' }}>
              <h4 className="table-title" style={{ fontSize: '15px' }}>{group.category} Approvals</h4>
              <span className={`badge ${group.category.toLowerCase()}`}>{group.requests.length} requests</span>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr><th>Student</th><th>Request</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {group.requests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.student}</td>
                      <td>{request.type}</td>
                      <td>
                        <span className={`badge ${request.status === 'Approved' ? 'low' : request.status === 'Pending' ? 'watch' : 'high'}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="table-actions-cell">
                        <button className="btn btn-secondary" onClick={() => updateStatus(request.id, 'Approved')}>Approve</button>
                        <button className="btn btn-secondary" onClick={() => updateStatus(request.id, 'Rejected')}>Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}

export default AdminStudentApprovals
