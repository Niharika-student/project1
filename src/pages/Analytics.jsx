import { CheckCircle2, Lightbulb, ShieldCheck, Target } from 'lucide-react'

const scorecards = [
  { title: 'Verification Quality', score: 94, trend: '+3 pts', tone: 'high' },
  { title: 'Submission Completeness', score: 88, trend: '+5 pts', tone: 'high' },
  { title: 'Review Turnaround', score: 76, trend: '-2 pts', tone: 'medium' },
  { title: 'Student Participation', score: 82, trend: '+4 pts', tone: 'high' },
]

const departmentMatrix = [
  { department: 'Science', records: 320, verified: 302, avgDays: 1.8, risk: 'Low' },
  { department: 'Engineering', records: 280, verified: 251, avgDays: 2.3, risk: 'Medium' },
  { department: 'Arts', records: 185, verified: 166, avgDays: 2.1, risk: 'Low' },
  { department: 'Business', records: 195, verified: 164, avgDays: 3.2, risk: 'Medium' },
  { department: 'Medicine', records: 165, verified: 159, avgDays: 1.6, risk: 'Low' },
  { department: 'Law', records: 120, verified: 93, avgDays: 4.0, risk: 'High' },
]

const recommendations = [
  'Create a fast-track workflow for leadership category submissions.',
  'Require organizer email validation before records enter review lane.',
  'Auto-flag records pending for more than 3 days for priority handling.',
  'Standardize evidence templates for arts and community categories.',
]

const checkpoints = [
  { label: 'Policy Alignment', status: 'Healthy', note: 'Rule coverage updated for all 5 categories.' },
  { label: 'Data Hygiene', status: 'Watch', note: '14 records have missing organizer contact fields.' },
  { label: 'Audit Trail', status: 'Healthy', note: 'All approvals include reviewer metadata.' },
]

function Analytics() {
  return (
    <div className="animate-in">
      <div className="summary-grid">
        {scorecards.map((card) => (
          <section className="summary-card" key={card.title}>
            <p className="summary-card-label">{card.title}</p>
            <p className="summary-card-value">{card.score}</p>
            <p className={`summary-trend ${card.tone}`}>{card.trend}</p>
          </section>
        ))}
      </div>

      <div className="charts-grid">
        <section className="table-card">
          <div className="table-header">
            <h3 className="table-title">Department Performance Matrix</h3>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Total Records</th>
                  <th>Verified</th>
                  <th>Avg Review Days</th>
                  <th>Risk</th>
                </tr>
              </thead>
              <tbody>
                {departmentMatrix.map((row) => (
                  <tr key={row.department}>
                    <td>{row.department}</td>
                    <td>{row.records}</td>
                    <td>{row.verified}</td>
                    <td>{row.avgDays}</td>
                    <td>
                      <span className={`badge ${row.risk.toLowerCase()}`}>{row.risk}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="table-card">
          <div className="table-header">
            <h3 className="table-title">Action Recommendations</h3>
          </div>
          <div className="insight-list">
            {recommendations.map((item) => (
              <article className="insight-item" key={item}>
                <Lightbulb size={16} />
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="charts-grid" style={{ marginTop: '18px' }}>
        <section className="table-card">
          <div className="table-header">
            <h3 className="table-title">Governance Checkpoints</h3>
          </div>
          <div className="checkpoint-grid">
            {checkpoints.map((item) => (
              <article className="checkpoint-item" key={item.label}>
                <div className="checkpoint-head">
                  {item.status === 'Healthy' ? <ShieldCheck size={16} /> : <Target size={16} />}
                  <strong>{item.label}</strong>
                </div>
                <span className={`badge ${item.status.toLowerCase()}`}>{item.status}</span>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="recent-activity">
          <h3 className="table-title">Quick Validation</h3>
          <article className="activity-item">
            <div className="activity-icon"><CheckCircle2 size={14} /></div>
            <div className="activity-content">
              <h4>Approval consistency</h4>
              <p>97% of reviewed records follow current rubric.</p>
            </div>
          </article>
          <article className="activity-item">
            <div className="activity-icon"><CheckCircle2 size={14} /></div>
            <div className="activity-content">
              <h4>Duplicate prevention</h4>
              <p>Only 3 potential duplicate submissions found this week.</p>
            </div>
          </article>
          <article className="activity-item">
            <div className="activity-icon"><CheckCircle2 size={14} /></div>
            <div className="activity-content">
              <h4>Escalation flow</h4>
              <p>All high-risk records are assigned within 4 hours.</p>
            </div>
          </article>
        </section>
      </div>
    </div>
  )
}

export default Analytics
