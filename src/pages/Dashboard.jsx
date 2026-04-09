import { Award, CheckCircle2, Clock3, Flag, Users } from 'lucide-react'

const summaryCards = [
  { label: 'Total Students', value: '2,847', hint: '+64 this month', icon: Users },
  { label: 'Open Verifications', value: '37', hint: '12 due this week', icon: Clock3 },
  { label: 'Active Achievements', value: '58', hint: '6 need updates', icon: Award },
  { label: 'Completed Reviews', value: '1,293', hint: '+82 this month', icon: CheckCircle2 },
]

const laneData = [
  {
    title: 'New Submissions',
    count: 14,
    items: [
      'Science Expo finalist evidence review',
      'District football medal verification',
      'Community drive participation batch',
    ],
  },
  {
    title: 'Needs Clarification',
    count: 9,
    items: [
      'Arts club portfolio attachments',
      'Missing organizer confirmation for coding contest',
      'Debate league score sheet mismatch',
    ],
  },
  {
    title: 'Ready To Publish',
    count: 11,
    items: [
      'Student council leadership recognitions',
      'Volunteer program hour completions',
      'Inter-college innovation challenge winners',
    ],
  },
]

const priorities = [
  { title: 'Semester End Audit', owner: 'Admin Team', due: 'Apr 12', level: 'High' },
  { title: 'Sports Records Reconciliation', owner: 'Coach Desk', due: 'Apr 15', level: 'Medium' },
  { title: 'Community Category Rules Update', owner: 'Policy Desk', due: 'Apr 17', level: 'Low' },
]

const recentActivity = [
  { actor: 'Emily Chen', action: 'submitted Science Fair Winner evidence', time: '10m ago' },
  { actor: 'Dr. Maya Rao', action: 'approved 8 student records', time: '32m ago' },
  { actor: 'System', action: 'generated weekly verification snapshot', time: '1h ago' },
  { actor: 'Anna Garcia', action: 'requested status review for Community Award', time: '2h ago' },
]

function Dashboard() {
  return (
    <div className="animate-in">
      <div className="stats-grid">
        {summaryCards.map((card) => (
          <section className="stat-card" key={card.label}>
            <div className="stat-card-header">
              <div className="stat-card-icon">
                <card.icon size={18} />
              </div>
            </div>
            <div className="stat-card-value">{card.value}</div>
            <div className="stat-card-label">{card.label}</div>
            <p className="stat-card-note">{card.hint}</p>
          </section>
        ))}
      </div>

      <div className="kanban-grid">
        {laneData.map((lane) => (
          <section className="kanban-lane" key={lane.title}>
            <div className="kanban-head">
              <h3>{lane.title}</h3>
              <span>{lane.count}</span>
            </div>
            {lane.items.map((item) => (
              <article className="kanban-item" key={item}>
                <Flag size={14} />
                <p>{item}</p>
              </article>
            ))}
          </section>
        ))}
      </div>

      <div className="charts-grid">
        <section className="table-card">
          <div className="table-header">
            <h3 className="table-title">Priority Queue</h3>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Owner</th>
                  <th>Due</th>
                  <th>Level</th>
                </tr>
              </thead>
              <tbody>
                {priorities.map((priority) => (
                  <tr key={priority.title}>
                    <td>{priority.title}</td>
                    <td>{priority.owner}</td>
                    <td>{priority.due}</td>
                    <td>
                      <span className={`badge ${priority.level.toLowerCase()}`}>{priority.level}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="recent-activity">
          <h3 className="table-title">Live Activity</h3>
          {recentActivity.map((activity) => (
            <article className="activity-item" key={`${activity.actor}-${activity.time}`}>
              <div className="activity-icon">
                <Users size={14} />
              </div>
              <div className="activity-content">
                <h4>{activity.actor}</h4>
                <p>{activity.action}</p>
              </div>
              <span className="activity-time">{activity.time}</span>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}

export default Dashboard
