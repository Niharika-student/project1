import { useState } from 'react'
import { CheckCircle2, MessageSquare, Sparkles } from 'lucide-react'

function ImprovementSuggestions() {
  const [text, setText] = useState('')
  const [items, setItems] = useState([])
  const [message, setMessage] = useState('')

  const submitSuggestion = () => {
    if (!text.trim()) {
      setMessage('Suggestion cannot be empty.')
      return
    }

    setItems((prev) => [{ id: prev.length + 1, text }, ...prev])
    setText('')
    setMessage('Suggestion submitted successfully.')
  }

  return (
    <section className="page-stack">
      <div className="page-hero compact">
        <div>
          <p className="landing-kicker">Feedback Board</p>
          <h3 className="page-hero-title">Share useful ideas in a clean, focused submission area.</h3>
          <p className="page-hero-copy">Write one suggestion, submit it, and track it in the list below.</p>
        </div>
        <div className="hero-badges">
          <span><MessageSquare size={14} /> Suggestions board</span>
          <span><Sparkles size={14} /> Clean input</span>
          <span><CheckCircle2 size={14} /> Working submit</span>
        </div>
      </div>

      <h3 className="section-title">Improvement Suggestions</h3>
      <div className="auth-card suggestions-card" style={{ maxWidth: '720px' }}>
        <textarea className="form-textarea" value={text} onChange={(event) => setText(event.target.value)} placeholder="Share your suggestion" />
        <div className="form-actions">
          <button className="btn btn-primary" type="button" onClick={submitSuggestion}>Submit Suggestion</button>
          <button className="btn btn-secondary" type="button" onClick={() => setText('')}>Clear</button>
        </div>
        {message && <p className="page-message">{message}</p>}
      </div>

      {items.length > 0 && (
        <div className="table-card" style={{ marginTop: '14px' }}>
          <table>
            <thead><tr><th>#</th><th>Suggestion</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}><td>{item.id}</td><td>{item.text}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ImprovementSuggestions
