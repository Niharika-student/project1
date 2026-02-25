import { useMemo, useState } from 'react'
import { Users, Award, TrendingUp, Clock, ArrowUpRight, ArrowDownRight, Star, Trophy } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { chartTooltipStyle } from '../utils/chartTooltip'

const statsData = [
  { label: 'Total Students', value: '2,847', trend: '+12.5%', up: true, icon: Users, color: 'blue' },
  { label: 'Achievements Awarded', value: '1,293', trend: '+8.2%', up: true, icon: Award, color: 'green' },
  { label: 'Average Rate', value: '45.4%', trend: '+2.1%', up: true, icon: TrendingUp, color: 'amber' },
  { label: 'Pending Reviews', value: '23', trend: '-5.3%', up: false, icon: Clock, color: 'red' },
]

const trendDataStructure = {
  monthly: [
    { label: 'Jan', achievements: 85, students: 42 },
    { label: 'Feb', achievements: 92, students: 48 },
    { label: 'Mar', achievements: 108, students: 55 },
    { label: 'Apr', achievements: 95, students: 51 },
    { label: 'May', achievements: 120, students: 62 },
    { label: 'Jun', achievements: 145, students: 71 },
    { label: 'Jul', achievements: 138, students: 68 },
    { label: 'Aug', achievements: 125, students: 63 },
    { label: 'Sep', achievements: 156, students: 78 },
    { label: 'Oct', achievements: 142, students: 72 },
    { label: 'Nov', achievements: 165, students: 85 },
    { label: 'Dec', achievements: 152, students: 76 },
  ],
  quarterly: [
    { label: 'Q1', achievements: 285, students: 145 },
    { label: 'Q2', achievements: 360, students: 184 },
    { label: 'Q3', achievements: 419, students: 209 },
    { label: 'Q4', achievements: 459, students: 233 },
  ],
  yearly: [
    { label: '2022', achievements: 980, students: 512 },
    { label: '2023', achievements: 1125, students: 586 },
    { label: '2024', achievements: 1293, students: 654 },
    { label: '2025', achievements: 1410, students: 710 },
  ],
}

const pieDataStructure = {
  participation: [
    { name: 'Academic', value: 35, color: '#4F46E5' },
    { name: 'Sports', value: 25, color: '#059669' },
    { name: 'Arts', value: 18, color: '#D97706' },
    { name: 'Leadership', value: 12, color: '#7C3AED' },
    { name: 'Community', value: 10, color: '#EA580C' },
  ],
  points: [
    { name: 'Academic', value: 420, color: '#4F46E5' },
    { name: 'Sports', value: 320, color: '#059669' },
    { name: 'Arts', value: 205, color: '#D97706' },
    { name: 'Leadership', value: 188, color: '#7C3AED' },
    { name: 'Community', value: 160, color: '#EA580C' },
  ],
}

const recentAchievements = [
  { id: 1, student: 'Emily Chen', achievement: 'Science Fair Winner', category: 'academic', date: '2 hours ago', avatar: 'EC', avatarColor: '#4F46E5' },
  { id: 2, student: 'Michael Brown', achievement: 'Basketball Championship', category: 'sports', date: '5 hours ago', avatar: 'MB', avatarColor: '#059669' },
  { id: 3, student: 'Sarah Wilson', achievement: 'Art Exhibition', category: 'arts', date: '1 day ago', avatar: 'SW', avatarColor: '#D97706' },
  { id: 4, student: 'James Lee', achievement: 'Student Council President', category: 'leadership', date: '1 day ago', avatar: 'JL', avatarColor: '#7C3AED' },
  { id: 5, student: 'Anna Garcia', achievement: 'Community Service Award', category: 'community', date: '2 days ago', avatar: 'AG', avatarColor: '#EA580C' },
]

const topStudents = [
  { rank: 1, name: 'Emily Chen', achievements: 12, score: 98 },
  { rank: 2, name: 'James Lee', achievements: 10, score: 95 },
  { rank: 3, name: 'Sarah Wilson', achievements: 9, score: 93 },
  { rank: 4, name: 'Michael Brown', achievements: 8, score: 91 },
  { rank: 5, name: 'Anna Garcia', achievements: 7, score: 89 },
]

function Dashboard() {
  const [trendView, setTrendView] = useState('monthly')
  const [pieMetric, setPieMetric] = useState('participation')

  const trendData = useMemo(() => trendDataStructure[trendView], [trendView])
  const pieData = useMemo(() => pieDataStructure[pieMetric], [pieMetric])

  return (
    <div className="animate-in">
      {/* Stats Cards */}
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div 
            className="stat-card" 
            key={index}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="stat-card-header">
              <div className={`stat-card-icon ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className={`stat-card-trend ${stat.up ? 'up' : 'down'}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </span>
            </div>
            <div className="stat-card-value">{stat.value}</div>
            <div className="stat-card-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="charts-grid">
        {/* Line Chart */}
        <div className="chart-card" style={{ animationDelay: '0.4s' }}>
          <div className="chart-card-header">
            <h3 className="chart-card-title">Achievement Trends</h3>
            <div className="chart-control-row">
              <select className="filter-select" value={trendView} onChange={(event) => setTrendView(event.target.value)}>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="label" stroke="#64748B" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  ...chartTooltipStyle,
                  borderRadius: '10px',
                  padding: '12px',
                }}
              />
              <Legend iconType="circle" iconSize={8} />
              <Line 
                type="monotone" 
                dataKey="achievements" 
                stroke="#4F46E5" 
                strokeWidth={3}
                dot={{ fill: '#4F46E5', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#4F46E5', stroke: 'white', strokeWidth: 2 }}
                name="Achievements"
              />
              <Line 
                type="monotone" 
                dataKey="students" 
                stroke="#059669" 
                strokeWidth={3}
                dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#059669', stroke: 'white', strokeWidth: 2 }}
                name="Students"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="chart-card" style={{ animationDelay: '0.5s' }}>
          <div className="chart-card-header">
            <h3 className="chart-card-title">Category Distribution</h3>
            <div className="chart-control-row">
              <select className="filter-select" value={pieMetric} onChange={(event) => setPieMetric(event.target.value)}>
                <option value="participation">By Participation</option>
                <option value="points">By Points</option>
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={6}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  ...chartTooltipStyle,
                  borderRadius: '10px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '-10px' }}>
            {pieData.map((cat, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: cat.color }}></div>
                {cat.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Top Students */}
      <div className="charts-grid">
        {/* Recent Achievements Table */}
        <div className="table-card" style={{ animationDelay: '0.6s' }}>
          <div className="table-header">
            <h3 className="table-title">Recent Achievements</h3>
            <button className="btn btn-secondary">View All</button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Achievement</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentAchievements.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="table-user">
                        <div className="table-user-avatar" style={{ background: `linear-gradient(135deg, ${item.avatarColor}, ${item.avatarColor}dd)` }}>
                          {item.avatar}
                        </div>
                        <div className="table-user-info">
                          <h4>{item.student}</h4>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: '500' }}>{item.achievement}</td>
                    <td>
                      <span className={`badge ${item.category}`}>
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </span>
                    </td>
                    <td style={{ color: '#64748B' }}>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Students */}
        <div className="recent-activity" style={{ animationDelay: '0.7s' }}>
          <div className="table-header" style={{ padding: 0, border: 'none', marginBottom: '8px' }}>
            <h3 className="table-title">Top Students</h3>
          </div>
          {topStudents.map((student) => (
            <div className="activity-item" key={student.rank}>
              <div className="activity-icon" style={{ 
                background: student.rank <= 3 ? 'linear-gradient(135deg, #D97706, #FBBF24)' : '#F1F5F9',
                color: student.rank <= 3 ? 'white' : '#64748B'
              }}>
                <Star size={18} fill={student.rank <= 3 ? 'white' : 'none'} />
              </div>
              <div className="activity-content">
                <h4>{student.name}</h4>
                <p>{student.achievements} achievements</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '700', fontSize: '18px', color: student.rank <= 3 ? '#D97706' : '#0F172A' }}>
                  {student.score}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Score</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
