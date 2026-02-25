import { useState } from 'react'
import { Plus, Search, Eye, Edit, Trash2, X, BookOpen, Trophy, Palette, Users, Crown } from 'lucide-react'

const achievementsData = [
  // Academic
  { id: 1, name: 'Science Fair Winner', category: 'Academic', description: 'First place in annual science fair', points: 100, recipients: 15, status: 'Active', icon: BookOpen },
  { id: 2, name: 'Math Olympiad', category: 'Academic', description: 'Top 10 in regional math olympiad', points: 95, recipients: 10, status: 'Active', icon: BookOpen },
  { id: 3, name: 'Research Excellence', category: 'Academic', description: 'Outstanding research paper publication', points: 85, recipients: 8, status: 'Active', icon: BookOpen },
  
  // Sports
  { id: 4, name: 'Basketball Championship', category: 'Sports', description: 'Won inter-school basketball tournament', points: 80, recipients: 12, status: 'Active', icon: Trophy },
  { id: 5, name: 'Swimming Competition', category: 'Sports', description: 'First place in swimming competition', points: 80, recipients: 8, status: 'Active', icon: Trophy },
  { id: 6, name: 'Athletics Medal', category: 'Sports', description: 'Track and field achievements', points: 70, recipients: 20, status: 'Active', icon: Trophy },
  
  // Arts
  { id: 7, name: 'Art Exhibition', category: 'Arts', description: 'Featured in school art exhibition', points: 60, recipients: 25, status: 'Active', icon: Palette },
  { id: 8, name: 'Music Concert', category: 'Arts', description: 'Performed in school music concert', points: 55, recipients: 20, status: 'Active', icon: Palette },
  { id: 9, name: 'Drama Award', category: 'Arts', description: 'Best actor/actress in school play', points: 65, recipients: 6, status: 'Active', icon: Palette },
  
  // Leadership
  { id: 10, name: 'Student Council President', category: 'Leadership', description: 'Elected as student council president', points: 90, recipients: 8, status: 'Active', icon: Crown },
  { id: 11, name: 'Debate Championship', category: 'Leadership', description: 'Won debate competition', points: 85, recipients: 6, status: 'Active', icon: Crown },
  { id: 12, name: 'Team Captain', category: 'Leadership', description: 'Captain of school team', points: 75, recipients: 15, status: 'Active', icon: Crown },
  
  // Community
  { id: 13, name: 'Community Service Award', category: 'Community', description: '100+ hours of community service', points: 75, recipients: 32, status: 'Active', icon: Users },
  { id: 14, name: 'Volunteer Program', category: 'Community', description: 'Completed volunteer program', points: 50, recipients: 45, status: 'Active', icon: Users },
  { id: 15, name: 'Peer Mentoring', category: 'Community', description: 'Mentored fellow students', points: 60, recipients: 18, status: 'Active', icon: Users },
]

const categoryConfig = {
  Academic: { 
    color: '#4F46E5', 
    bgColor: '#EEF2FF',
    icon: BookOpen 
  },
  Sports: { 
    color: '#059669', 
    bgColor: '#ECFDF5',
    icon: Trophy 
  },
  Arts: { 
    color: '#D97706', 
    bgColor: '#FEF3C7',
    icon: Palette 
  },
  Leadership: { 
    color: '#7C3AED', 
    bgColor: '#F3E8FF',
    icon: Crown 
  },
  Community: { 
    color: '#EA580C', 
    bgColor: '#FFEDD5',
    icon: Users 
  },
}

function Achievements() {
  const [achievements, setAchievements] = useState(achievementsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')
  const [popupType, setPopupType] = useState('success')
  const [newAchievement, setNewAchievement] = useState({
    name: '',
    category: 'Academic',
    description: '',
    points: '',
  })

  const categories = ['All', 'Academic', 'Sports', 'Arts', 'Leadership', 'Community']

  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = achievement.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || achievement.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const groupedAchievements = categories.slice(1).reduce((acc, category) => {
    acc[category] = achievements.filter(a => a.category === category)
    return acc
  }, {})

  const handleCreateAchievement = () => {
    const numericPoints = Number(newAchievement.points)

    if (!newAchievement.name.trim() || !newAchievement.description.trim() || !newAchievement.points) {
      setPopupType('error')
      setPopupMessage('Please fill all fields before creating an achievement.')
      setTimeout(() => setPopupMessage(''), 2500)
      return
    }

    if (Number.isNaN(numericPoints) || numericPoints <= 0) {
      setPopupType('error')
      setPopupMessage('Points must be a valid number greater than 0.')
      setTimeout(() => setPopupMessage(''), 2500)
      return
    }

    const config = categoryConfig[newAchievement.category]
    const nextId = achievements.length ? Math.max(...achievements.map((item) => item.id)) + 1 : 1
    const createdAchievement = {
      id: nextId,
      name: newAchievement.name.trim(),
      category: newAchievement.category,
      description: newAchievement.description.trim(),
      points: numericPoints,
      recipients: 0,
      status: 'Active',
      icon: config?.icon || BookOpen,
    }

    setAchievements((prev) => [createdAchievement, ...prev])
    setCategoryFilter('All')
    setShowModal(false)
    setNewAchievement({ name: '', category: 'Academic', description: '', points: '' })
    setPopupType('success')
    setPopupMessage(`Achievement "${createdAchievement.name}" added successfully.`)
    setTimeout(() => setPopupMessage(''), 2500)
  }

  return (
    <div className="animate-in">
      {popupMessage && <div className={`popup-message ${popupType}`}>{popupMessage}</div>}

      {/* Category Filter Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '24px',
        padding: '4px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        width: 'fit-content'
      }}>
        {categories.map((category) => {
          const config = categoryConfig[category]
          const IconComponent = config?.icon || BookOpen
          const isActive = categoryFilter === category
          
          return (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                border: 'none',
                background: isActive ? config?.color : 'transparent',
                color: isActive ? 'white' : '#64748B',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <IconComponent size={16} />
              {category}
              <span style={{
                padding: '2px 8px',
                borderRadius: '10px',
                background: isActive ? 'rgba(255,255,255,0.2)' : config?.bgColor,
                color: isActive ? 'white' : config?.color,
                fontSize: '11px'
              }}>
                {category === 'All' ? achievements.length : groupedAchievements[category]?.length || 0}
              </span>
            </button>
          )
        })}
      </div>

      {/* Search and Add */}
      <div className="filters-section">
        <div className="search-wrapper" style={{ flex: 1, maxWidth: '400px' }}>
          <div className="search-box" style={{ width: '100%' }}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search achievements..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Add Achievement
        </button>
      </div>

      {/* Achievement Cards by Category */}
      {categoryFilter === 'All' ? (
        // Show all categories grouped
        Object.entries(groupedAchievements).map(([category, achievements]) => {
          const config = categoryConfig[category]
          const IconComponent = config.icon
          
          return (
            <div key={category} style={{ marginBottom: '32px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                marginBottom: '16px' 
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: config.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: config.color
                }}>
                  <IconComponent size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>{category}</h3>
                  <p style={{ fontSize: '13px', color: '#64748B' }}>{achievements.length} achievements</p>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {achievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </div>
          )
        })
      ) : (
        // Show single category
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {filteredAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Achievement</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Achievement Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter achievement name"
                  value={newAchievement.name}
                  onChange={(event) => setNewAchievement((prev) => ({ ...prev, name: event.target.value }))}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" value={newAchievement.category} onChange={(event) => setNewAchievement((prev) => ({ ...prev, category: event.target.value }))}>
                  <option value="Academic">Academic</option>
                  <option value="Sports">Sports</option>
                  <option value="Arts">Arts</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Community">Community</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-textarea"
                  placeholder="Enter description"
                  value={newAchievement.description}
                  onChange={(event) => setNewAchievement((prev) => ({ ...prev, description: event.target.value }))}
                ></textarea>
              </div>
              
              <div className="form-group">
                <label className="form-label">Points</label>
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="Enter points"
                  value={newAchievement.points}
                  onChange={(event) => setNewAchievement((prev) => ({ ...prev, points: event.target.value }))}
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleCreateAchievement}>
                Create Achievement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Achievement Card Component
function AchievementCard({ achievement }) {
  const config = categoryConfig[achievement.category]
  const IconComponent = achievement.icon || config.icon

  return (
    <div className="table-card" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div style={{ 
          width: '46px', 
          height: '46px', 
          borderRadius: '12px',
          background: config.bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: config.color
        }}>
          <IconComponent size={24} />
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button className="icon-btn" title="View"><Eye size={15} /></button>
          <button className="icon-btn" title="Edit"><Edit size={15} /></button>
          <button className="icon-btn" title="Delete"><Trash2 size={15} /></button>
        </div>
      </div>
      
      <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '6px', color: '#0F172A' }}>
        {achievement.name}
      </h3>
      <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px', lineHeight: '1.5' }}>
        {achievement.description}
      </p>
      
      <div style={{ display: 'flex', gap: '16px', marginBottom: '14px' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Points</div>
          <div style={{ fontWeight: '700', fontSize: '16px', color: config.color }}>{achievement.points}</div>
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Recipients</div>
          <div style={{ fontWeight: '700', fontSize: '16px' }}>{achievement.recipients}</div>
        </div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingTop: '14px',
        borderTop: '1px solid #E2E8F0'
      }}>
        <span style={{ 
          fontSize: '12px',
          color: achievement.status === 'Active' ? '#059669' : '#94A3B8',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: achievement.status === 'Active' ? '#059669' : '#94A3B8'
          }}></span>
          {achievement.status}
        </span>
        <button 
          className="btn btn-secondary" 
          style={{ padding: '6px 14px', fontSize: '12px' }}
        >
          Assign
        </button>
      </div>
    </div>
  )
}

export default Achievements
