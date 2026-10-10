import { DURATIONS, TYPES } from '../data/catalog'
import { ROUTES } from '../lib/router'
import { useOrg, useStore } from '../lib/store'
import { BenefitList, TypeBadge, Verified } from './ui'

export function FavButton({ id }) {
  const { state, dispatch } = useStore()
  const fav = state.favorites.includes(id)
  return (
    <button
      className={`fav ${fav ? 'fav-on' : ''}`}
      aria-label={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
      aria-pressed={fav}
      onClick={() => dispatch({ type: 'toggleFavorite', id })}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20.5s-7.3-4.4-9.4-8.9C1.1 8.3 3.2 4.5 6.9 4.5c2 0 3.4 1.1 5.1 2.9 1.7-1.8 3.1-2.9 5.1-2.9 3.7 0 5.8 3.8 4.3 7.1-2.1 4.5-9.4 8.9-9.4 8.9z" />
      </svg>
    </button>
  )
}

export function OpportunityCard({ op, match }) {
  const org = useOrg(op.orgId)

  return (
    <article className="card op-card" style={{ '--tone': TYPES[op.type].color }}>
      <div className="op-card-top">
        <TypeBadge type={op.type} />
        <FavButton id={op.id} />
      </div>
      <a href={ROUTES.opportunity(op.id)} className="op-card-link">
        <h3>{op.title}</h3>
      </a>
      <p className="op-place">{op.place} · {op.province}</p>
      <p className="op-summary">{op.summary}</p>
      <BenefitList benefits={op.benefits} />
      <div className="op-card-foot">
        <span className="muted">{DURATIONS[op.duration].label}</span>
        {org && <Verified verified={org.verified} />}
      </div>
      {match && (
        <div className="match">
          <div className="match-row">
            <div className="match-bar"><span style={{ width: `${match.score}%` }} /></div>
            <span className="match-score">{match.score}%</span>
          </div>
          <ul>{match.reasons.map((r) => <li key={r}>{r}</li>)}</ul>
        </div>
      )}
    </article>
  )
}
