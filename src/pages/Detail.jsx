import { useState } from 'react'
import { DURATIONS, SKILLS, TYPES } from '../data/catalog'
import { ApplyModal } from '../components/ApplyModal'
import { MapView } from '../components/MapView'
import { FavButton } from '../components/OpportunityCard'
import { BenefitList, Stars, StatusBadge, TypeBadge, Verified } from '../components/ui'
import { ROUTES } from '../lib/router'
import { useOrg, useStore } from '../lib/store'

const MAX_RATING = 5

export function Detail({ id }) {
  const { state } = useStore()
  const op = state.opportunities.find((o) => o.id === id)
  const org = useOrg(op?.orgId)
  const [applying, setApplying] = useState(false)
  const [sent, setSent] = useState(false)

  if (!op) return <div className="wrap section empty card">Esta oportunidad ya no existe. <a href={ROUTES.explore}>Volver a explorar</a></div>

  const mine = state.applications.find((a) => a.mine && a.oppId === op.id)
  const reviews = state.reviews.filter((r) => r.oppId === op.id)
  const taken = state.applications.filter((a) => a.oppId === op.id && a.status === 'aceptada').length

  return (
    <div className="wrap section">
      <a href={ROUTES.explore} className="back">← Volver</a>
      <div className="detail">
        <div>
          <div className="detail-head" style={{ '--tone': TYPES[op.type].color }}>
            <TypeBadge type={op.type} />
            <h1>{op.title}</h1>
            <p className="op-place">{op.place} · {op.province} · {DURATIONS[op.duration].label}</p>
          </div>
          <p className="lead">{op.summary}</p>

          <h2>Qué vas a hacer</h2>
          <ul className="list">{op.activities.map((a) => <li key={a}>{a}</li>)}</ul>

          <h2>Horario</h2>
          <p>{op.schedule}</p>

          <h2>Habilidades que ayudan</h2>
          <p>{op.skills.length ? op.skills.map((s) => SKILLS[s]).join(', ') : 'No se necesita experiencia previa.'}</p>

          <h2>Reseñas</h2>
          {reviews.length ? reviews.map((r) => (
            <div key={r.id} className="review">
              <Stars rating={r.rating} /> <strong>{r.author}</strong>
              <p>{r.text}</p>
            </div>
          )) : <p className="muted">Todavía no hay reseñas.</p>}
          {mine?.status === 'aceptada' && <ReviewForm oppId={op.id} />}
        </div>

        <aside className="card detail-side">
          <h3>Recibes a cambio</h3>
          <BenefitList benefits={op.benefits} />
          <p className="muted small">Cupos: {Math.max(op.spots - taken, 0)} de {op.spots} disponibles</p>

          {mine ? (
            <div className="applied">
              <span>Tu solicitud:</span> <StatusBadge status={mine.status} />
            </div>
          ) : state.role === 'viajero' ? (
            <button className="btn btn-block" onClick={() => setApplying(true)}>Solicitar participar</button>
          ) : (
            <p className="muted small">Cambia a modo Viajero para solicitar.</p>
          )}
          {sent && <p className="ok-msg">Listo, la organización recibió tu solicitud.</p>}
          <div className="side-row"><FavButton id={op.id} /> Guardar</div>

          {org && (
            <div className="org-box">
              <strong>{org.name}</strong>
              <Verified verified={org.verified} />
              <p className="small">{org.about}</p>
            </div>
          )}
          <MapView opportunities={[op]} height={200} />
        </aside>
      </div>
      {applying && <ApplyModal op={op} onClose={() => setApplying(false)} onDone={() => { setApplying(false); setSent(true) }} />}
    </div>
  )
}

function ReviewForm({ oppId }) {
  const { state, dispatch } = useStore()
  const [rating, setRating] = useState(MAX_RATING)
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)
  if (done) return <p className="ok-msg">Gracias por tu reseña.</p>

  const submit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    const author = state.profile.name.split(' ')[0]
    dispatch({ type: 'review', review: { oppId, author, rating, text } })
    setDone(true)
  }

  return (
    <form className="card review-form" onSubmit={submit}>
      <strong>¿Cómo te fue?</strong>
      <div className="rating-pick">
        {Array.from({ length: MAX_RATING }, (_, i) => i + 1).map((n) => (
          <button type="button" key={n} className={n <= rating ? 'on' : ''} onClick={() => setRating(n)} aria-label={`${n} estrellas`}>★</button>
        ))}
      </div>
      <textarea rows={2} value={text} onChange={(e) => setText(e.target.value)} placeholder="Cuéntale a otros viajeros" />
      <button className="btn small">Publicar reseña</button>
    </form>
  )
}
