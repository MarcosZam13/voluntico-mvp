import { useMemo, useState } from 'react'
import { BENEFITS, DURATIONS, PROVINCES, SKILLS, TYPES } from '../data/catalog'
import { ChipGroup, asOptions, labelsOf, toggleIn } from '../components/ui'
import { MapView } from '../components/MapView'
import { OpportunityCard } from '../components/OpportunityCard'
import { recommend } from '../lib/match'
import { useStore } from '../lib/store'

const EMPTY = { q: '', provinces: [], types: [], durations: [], benefits: [], skills: [] }
const RECOMMEND_COUNT = 3

// Dentro de cada grupo los filtros se suman (O); entre grupos se cruzan (Y).
const matches = (op, f) => {
  const text = `${op.title} ${op.place} ${op.summary}`.toLowerCase()
  return (
    (!f.q || text.includes(f.q.toLowerCase())) &&
    (!f.provinces.length || f.provinces.includes(op.province)) &&
    (!f.types.length || f.types.includes(op.type)) &&
    (!f.durations.length || f.durations.includes(op.duration)) &&
    (!f.benefits.length || f.benefits.every((b) => op.benefits.includes(b))) &&
    (!f.skills.length || op.skills.length === 0 || op.skills.some((s) => f.skills.includes(s)))
  )
}

export function Explore() {
  const { state } = useStore()
  const [f, setF] = useState(EMPTY)
  const [view, setView] = useState('lista')
  const toggle = (key) => (value) => setF((cur) => ({ ...cur, [key]: toggleIn(cur[key], value) }))

  const results = useMemo(() => state.opportunities.filter((op) => matches(op, f)), [state.opportunities, f])
  const recs = useMemo(() => recommend(state.opportunities, state.profile, RECOMMEND_COUNT), [state.opportunities, state.profile])
  const active = Object.values(f).some((v) => v.length)

  return (
    <div className="wrap section">
      {recs.length > 0 && !active && (
        <section className="recs">
          <div className="section-head">
            <h2>Recomendadas según tu perfil</h2>
            <a href="#/perfil">Ajustar perfil</a>
          </div>
          <div className="grid">
            {recs.map((r) => <OpportunityCard key={r.op.id} op={r.op} match={r} />)}
          </div>
        </section>
      )}

      <div className="explore">
        <aside className="filters card">
          <input className="search" placeholder="Buscar por lugar o actividad" value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} />
          <Filter title="Provincia"><ChipGroup name="Provincia" options={asOptions(PROVINCES)} selected={f.provinces} onToggle={toggle('provinces')} /></Filter>
          <Filter title="Tipo"><ChipGroup name="Tipo" options={labelsOf(TYPES)} selected={f.types} onToggle={toggle('types')} /></Filter>
          <Filter title="Duración"><ChipGroup name="Duración" options={labelsOf(DURATIONS)} selected={f.durations} onToggle={toggle('durations')} /></Filter>
          <Filter title="Beneficios"><ChipGroup name="Beneficios" options={BENEFITS} selected={f.benefits} onToggle={toggle('benefits')} /></Filter>
          <Filter title="Mis habilidades"><ChipGroup name="Habilidades" options={SKILLS} selected={f.skills} onToggle={toggle('skills')} /></Filter>
          {active && <button className="btn btn-ghost small" onClick={() => setF(EMPTY)}>Limpiar filtros</button>}
        </aside>

        <section>
          <div className="section-head">
            <h2>{results.length} {results.length === 1 ? 'oportunidad' : 'oportunidades'}</h2>
            <div className="segmented" role="group" aria-label="Vista">
              {['lista', 'mapa'].map((v) => (
                <button key={v} className={view === v ? 'on' : ''} onClick={() => setView(v)}>{v === 'lista' ? 'Lista' : 'Mapa'}</button>
              ))}
            </div>
          </div>
          {view === 'mapa' ? (
            <MapView opportunities={results} height={560} />
          ) : results.length ? (
            <div className="grid grid-2">
              {results.map((op) => <OpportunityCard key={op.id} op={op} />)}
            </div>
          ) : (
            <div className="empty card">Nada calza con esos filtros. Prueba quitando alguno.</div>
          )}
        </section>
      </div>
    </div>
  )
}

function Filter({ title, children }) {
  return (
    <div className="filter">
      <h3>{title}</h3>
      {children}
    </div>
  )
}
