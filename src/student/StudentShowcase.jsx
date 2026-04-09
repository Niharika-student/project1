import { Medal, Star, Trophy } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const categoryPerformance = [
  { category: 'Academic', points: 86, count: 1 },
  { category: 'Arts', points: 74, count: 1 },
  { category: 'Community', points: 45, count: 1 },
  { category: 'Leadership', points: 68, count: 1 },
]

const categorySplit = categoryPerformance.map((item) => ({
  name: item.category,
  value: item.count,
}))

const chartPalette = ['#3B82F6', '#F97316', '#16A34A', '#8B5CF6', '#06B6D4']

function StudentShowcase() {
  return (
    <section className="portal-page-stack">
      <article className="showcase-hero">
        <div className="showcase-avatar">E</div>
        <div>
          <h1>Emma Johnson</h1>
          <p>10th Grade • STU001 • emma.johnson@school.edu</p>
        </div>
      </article>

      <div className="showcase-stats">
        <article><Trophy size={33} /><strong>2</strong><span>Achievements</span></article>
        <article><Medal size={33} /><strong>1</strong><span>Activities</span></article>
        <article><Medal size={33} /><strong>45</strong><span>Hours</span></article>
        <article><Star size={33} /><strong>0</strong><span>Prestigious</span></article>
      </div>

      <article className="showcase-areas">
        <h2>Areas of Excellence</h2>
        <div className="showcase-tag-grid">
          <div className="showcase-pill blue">
            <strong>Academic Competition</strong>
            <span>1 achievement</span>
          </div>
          <div className="showcase-pill pink">
            <strong>Arts</strong>
            <span>1 achievement</span>
          </div>
        </div>
      </article>

      <section className="charts-grid">
        <article className="table-card chart-panel">
          <div className="table-header">
            <h3 className="table-title">Category Score Overview</h3>
          </div>
          <div className="chart-canvas">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="points" radius={[6, 6, 0, 0]}>
                  {categoryPerformance.map((item, index) => (
                    <Cell key={`${item.category}-points`} fill={chartPalette[index % chartPalette.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="table-card chart-panel">
          <div className="table-header">
            <h3 className="table-title">Category Participation Split</h3>
          </div>
          <div className="chart-canvas">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categorySplit} dataKey="value" nameKey="name" innerRadius={45} outerRadius={78} paddingAngle={5}>
                  {categorySplit.map((item, index) => (
                    <Cell key={`${item.name}-slice`} fill={chartPalette[index % chartPalette.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>
    </section>
  )
}

export default StudentShowcase
