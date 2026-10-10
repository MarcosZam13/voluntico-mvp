import { APPLICATION_STATUS, BENEFITS, TYPES } from '../data/catalog'

export function TypeBadge({ type }) {
  const t = TYPES[type]
  return (
    <span className="badge" style={{ '--tone': t.color }}>
      {t.label}
    </span>
  )
}

export function StatusBadge({ status }) {
  const s = APPLICATION_STATUS[status]
  return <span className={`status status-${s.tone}`}>{s.label}</span>
}

export function BenefitList({ benefits }) {
  if (!benefits.length) return null
  return (
    <ul className="benefits">
      {benefits.map((b) => (
        <li key={b}>{BENEFITS[b]}</li>
      ))}
    </ul>
  )
}

export function Verified({ verified }) {
  return verified ? (
    <span className="verified" title="Identidad de la organización verificada por VolunTico">
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="9" fill="currentColor" />
        <path d="M6 10.3l2.6 2.6L14 7.5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Verificada
    </span>
  ) : (
    <span className="unverified">Verificación en proceso</span>
  )
}

export function Stars({ rating }) {
  return (
    <span className="stars" aria-label={`${rating} de 5`}>
      {'★★★★★'.slice(0, rating)}
      <span className="stars-off">{'★★★★★'.slice(rating)}</span>
    </span>
  )
}

export function ChipGroup({ options, selected, onToggle, name }) {
  return (
    <div className="chips" role="group" aria-label={name}>
      {Object.entries(options).map(([key, label]) => (
        <button
          type="button"
          key={key}
          className={`chip ${selected.includes(key) ? 'chip-on' : ''}`}
          aria-pressed={selected.includes(key)}
          onClick={() => onToggle(key)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export const toggleIn = (list, value) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

export const asOptions = (list) => Object.fromEntries(list.map((v) => [v, v]))
export const labelsOf = (obj) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v.label ?? v]))
