import { useMemo, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, Legend } from 'recharts'
import { TrendingUp, Users, Award, Star } from 'lucide-react'
import { chartTooltipStyle } from '../utils/chartTooltip'

const trendStructure = {
  monthly: [
    { label: 'Jan', academic: 45, sports: 32, arts: 25, leadership: 18, community: 15 },
    { label: 'Feb', academic: 52, sports: 38, arts: 28, leadership: 22, community: 18 },
    { label: 'Mar', academic: 48, sports: 42, arts: 35, leadership: 25, community: 20 },
    { label: 'Apr', academic: 55, sports: 35, arts: 30, leadership: 28, community: 22 },
    { label: 'May', academic: 60, sports: 48, arts: 32, leadership: 30, community: 25 },
    { label: 'Jun', academic: 58, sports: 52, arts: 38, leadership: 32, community: 28 },
    { label: 'Jul', academic: 65, sports: 45, arts: 40, leadership: 35, community: 30 },
    { label: 'Aug', academic: 70, sports: 50, arts: 42, leadership: 38, community: 32 },
    { label: 'Sep', academic: 75, sports: 55, arts: 45, leadership: 40, community: 35 },
    { label: 'Oct', academic: 80, sports: 58, arts: 48, leadership: 42, community: 38 },
    { label: 'Nov', academic: 85, sports: 62, arts: 50, leadership: 45, community: 40 },
    { label: 'Dec', academic: 90, sports: 65, arts: 52, leadership: 48, community: 42 },
  ],
  quarterly: [
    { label: 'Q1', academic: 145, sports: 112, arts: 88, leadership: 65, community: 53 },
    { label: 'Q2', academic: 173, sports: 135, arts: 100, leadership: 90, community: 75 },
    { label: 'Q3', academic: 210, sports: 150, arts: 127, leadership: 113, community: 97 },
    { label: 'Q4', academic: 255, sports: 185, arts: 150, leadership: 135, community: 120 },
  ],
}

const pieStructure = {
  participation: [
    { name: 'Academic', value: 35, color: '#6366F1' },
    { name: 'Sports', value: 25, color: '#10B981' },
    { name: 'Arts', value: 18, color: '#F59E0B' },
    { name: 'Leadership', value: 12, color: '#9333EA' },
    { name: 'Community', value: 10, color: '#EA580C' },
  ],
  points: [
    { name: 'Academic', value: 520, color: '#6366F1' },
    { name: 'Sports', value: 402, color: '#10B981' },
    { name: 'Arts', value: 266, color: '#F59E0B' },
    { name: 'Leadership', value: 211, color: '#9333EA' },
    { name: 'Community', value: 189, color: '#EA580C' },
  ],
}

const topPerformers = [
  { rank: 1, name: 'Emily Chen', department: 'Science', score: 98, achievements: 12, trend: 'up' },
  { rank: 2, name: 'James Lee', department: 'Engineering', score: 95, achievements: 10, trend: 'up' },
  { rank: 3, name: 'Sarah Wilson', department: 'Arts', score: 93, achievements: 9, trend: 'stable' },
  { rank: 4, name: 'Michael Brown', department: 'Sports', score: 91, achievements: 8, trend: 'up' },
  { rank: 5, name: 'Anna Garcia', department: 'Medicine', score: 89, achievements: 7, trend: 'down' },
]

const departmentData = [
  { department: 'Science', students: 450, achievements: 320, avg: 8.5 },
  { department: 'Engineering', students: 380, achievements: 280, avg: 7.8 },
  { department: 'Arts', students: 290, achievements: 185, avg: 6.2 },
  { department: 'Business', students: 320, achievements: 195, avg: 5.9 },
  { department: 'Medicine', students: 210, achievements: 165, avg: 7.1 },
  { department: 'Law', students: 180, achievements: 120, avg: 6.5 },
]

const monthlyAchievementRate = [
  { month: 'Jan', rate: 42 },
  { month: 'Feb', rate: 45 },
  { month: 'Mar', rate: 48 },
  { month: 'Apr', rate: 46 },
  { month: 'May', rate: 52 },
  { month: 'Jun', rate: 55 },
  { month: 'Jul', rate: 58 },
  { month: 'Aug', rate: 60 },
  { month: 'Sep', rate: 63 },
  { month: 'Oct', rate: 65 },
  { month: 'Nov', rate: 68 },
  { month: 'Dec', rate: 70 },
]

const analyticsCards = [
  { label: 'Total Achievements', value: '1,293', change: '+12.5%', icon: Award, color: '#6366F1' },
  { label: 'Active Students', value: '2,847', change: '+8.2%', icon: Users, color: '#10B981' },
  { label: 'Avg Achievement Rate', value: '45.4%', change: '+2.1%', icon: TrendingUp, color: '#F59E0B' },
  { label: 'Top Performers', value: '156', change: '+5.3%', icon: Star, color: '#9333EA' },
]

function Analytics() {
  const [trendView, setTrendView] = useState('monthly')
  const [pieView, setPieView] = useState('participation')

  const trendData = useMemo(() => trendStructure[trendView], [trendView])
  const pieData = useMemo(() => pieStructure[pieView], [pieView])

  return (
    <div className="animate-in">
      {/* Analytics Cards */}
      <div className="stats-grid">
        {analyticsCards.map((card, index) => (
          <div 
            className="stat-card"
            key={index}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="stat-card-header">
              <div 
                className="stat-card-icon"
                style={{ 
                  background: `linear-gradient(135deg, ${card.color}, ${card.color}dd)`,
                  boxShadow: `0 4px 14px 0 ${card.color}40`
                }}
              >
                <card.icon size={26} />
              </div>
            </div>
            <div className="stat-card-value">{card.value}</div>
            <div className="stat-card-label">{card.label}</div>
            <div style={{ 
              fontSize: '12px', 
              color: '#10B981', 
              marginTop: '8px',
              fontWeight: '600'
            }}>
              {card.change} from last year
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="charts-grid">
        <div className="chart-card animate-in" style={{ animationDelay: '0.4s' }}>
          <div className="chart-card-header">
            <h3 className="chart-card-title">Achievement Trends by Category</h3>
            <div className="chart-control-row">
              <select className="filter-select" value={trendView} onChange={(event) => setTrendView(event.target.value)}>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorAcademic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSports" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="label" stroke="#64748B" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  ...chartTooltipStyle,
                  borderRadius: '12px',
                }}
              />
              <Legend iconType="circle" iconSize={8} />
              <Area type="monotone" dataKey="academic" stroke="#6366F1" fillOpacity={1} fill="url(#colorAcademic)" name="Academic" strokeWidth={2} />
              <Area type="monotone" dataKey="sports" stroke="#10B981" fillOpacity={1} fill="url(#colorSports)" name="Sports" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card animate-in" style={{ animationDelay: '0.5s' }}>
          <div className="chart-card-header">
            <h3 className="chart-card-title">Category Distribution</h3>
            <div className="chart-control-row">
              <select className="filter-select" value={pieView} onChange={(event) => setPieView(event.target.value)}>
                <option value="participation">By Participation</option>
                <option value="points">By Points</option>
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                paddingAngle={6}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  ...chartTooltipStyle,
                  borderRadius: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
            {pieData.map((cat, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: cat.color }}></div>
                <span>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="charts-grid">
        <div className="chart-card animate-in" style={{ animationDelay: '0.6s' }}>
          <div className="chart-card-header">
            <h3 className="chart-card-title">Achievement Rate Over Time</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyAchievementRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={12} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  ...chartTooltipStyle,
                  borderRadius: '12px',
                }}
                formatter={(value) => [`${value}%`, 'Achievement Rate']}
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#6366F1" 
                strokeWidth={3}
                dot={{ fill: '#6366F1', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#6366F1', stroke: 'white', strokeWidth: 2 }}
                name="Achievement Rate"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="table-card animate-in" style={{ animationDelay: '0.7s' }}>
          <div className="table-header">
            <h3 className="table-title">Top Performers</h3>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Student</th>
                  <th>Department</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {topPerformers.map((student) => (
                  <tr key={student.rank}>
                    <td>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: student.rank <= 3 ? 'linear-gradient(135deg, #F59E0B, #FCD34D)' : 'linear-gradient(135deg, #E2E8F0, #CBD5E1)',
                        color: student.rank <= 3 ? 'white' : '#64748B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '13px'
                      }}>
                        {student.rank}
                      </div>
                    </td>
                    <td>
                      <div className="table-user">
                        <div className="table-user-avatar" style={{ background: 'linear-gradient(135deg, #6366F1, #818CF8)' }}>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="table-user-info">
                          <h4>{student.name}</h4>
                          <p>{student.achievements} achievements</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: '500' }}>{student.department}</td>
                    <td>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        color: student.trend === 'up' ? '#10B981' : student.trend === 'down' ? '#EF4444' : '#64748B'
                      }}>
                        <span style={{ fontWeight: '700', fontSize: '18px' }}>{student.score}</span>
                        <span style={{ fontSize: '14px' }}>
                          {student.trend === 'up' ? '↑' : student.trend === 'down' ? '↓' : '→'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="chart-card animate-in" style={{ animationDelay: '0.8s' }}>
        <div className="chart-card-header">
          <h3 className="chart-card-title">Department-wise Performance</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
            <XAxis type="number" stroke="#64748B" fontSize={12} axisLine={false} tickLine={false} />
            <YAxis dataKey="department" type="category" stroke="#64748B" fontSize={12} width={100} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ 
                ...chartTooltipStyle,
                borderRadius: '12px',
              }}
            />
            <Bar dataKey="achievements" fill="#6366F1" name="Achievements" radius={[0, 6, 6, 0]} />
            <Bar dataKey="students" fill="#10B981" name="Students" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Analytics
