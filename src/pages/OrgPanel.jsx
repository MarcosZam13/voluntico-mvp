import { useState } from 'react'
import { BENEFITS, DURATIONS, MAP_CENTER, PROVINCES, SKILLS, TYPES } from '../data/catalog'
import { ChipGroup, StatusBadge, Verified, labelsOf, toggleIn } from '../components/ui'
import { ROUTES } from '../lib/router'
import { useOrg, useStore } from '../lib/store'

// Coordenadas aproximadas por provincia para ubicar en el mapa lo que se publica.
const PROVINCE_COORDS = {
  'San José': [9.93, -84.08],
  Alajuela: [10.32, -84.43],
  Cartago: [9.86, -83.92],
  Heredia: [10.0, -84.12],
  Guanacaste: [10.63, -85.44],
  Puntarenas: [9.98, -84.83],
  Limón: [9.99, -83.03],
}

const EMPTY_OP = {
  title: '', province: PROVINCES[0], place: '', type: 'ambiental', duration: 'semana',
  benefits: [], skills: [], spots: 4, summary: '', activities: '', schedule: '',
}

export function OrgPanel() {
  const { state, dispatch } = useStore()
  const org = useOrg(state.orgId)
  const [tab, setTab] = useState('solicitudes')
  const ownOps = state.opportunities.filter((o) => o.orgId === state.orgId)
  const ownIds = new Set(ownOps.map((o) => o.id))
  const apps = state.applications.filter((a) => ownIds.has(a.oppId))
  const pending = apps.filter((a) => a.status === 'pendiente').length
  const opTitle = (id) => ownOps.find((o) => o.id === id)?.title

  return (
    <div className="wrap section">
      <div className="org-head">
        <div>
          <p className="eyebrow">Panel de la organización</p>
          <h1>{org.name}</h1>
          <Verified verified={org.verified} />
        </div>
        <dl className="stats">
          <div><dt>{ownOps.length}</dt><dd>oportunidades</dd></div>
          <div><dt>{pending}</dt><dd>por revisar</dd></div>
          <div><dt>{apps.filter((a) => a.status === 'aceptada').length}</dt><dd>aceptadas</dd></div>
        </dl>
      </div>

      <div className="segmented tabs" role="tablist">
        {[['solicitudes', 'Solicitudes'], ['publicar', 'Publicar oportunidad'], ['mias', 'Mis oportunidades']].map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === 'solicitudes' && (
        apps.length ? (
          <ul className="app-list">
            {apps.map((a) => (
              <li key={a.id} className="card app-card">
                <div>
                  <strong>{a.name}</strong> <span className="muted small">para {opTitle(a.oppId)}</span>
                  <p>{a.message || <span className="muted">Sin mensaje.</span>}</p>
                  <p className="small">Habilidades: {a.skills.map((s) => SKILLS[s]).join(', ') || 'no indicó'}</p>
                  {a.status === 'aceptada' ? (
                    <p className="small sensitive">
                      Contacto: {a.email}
                      {a.sensitive && <> · Salud/alimentación: {a.sensitive}</>}
                    </p>
                  ) : (
                    <p className="small muted">El correo y los datos de salud se muestran solo si aceptas la solicitud.</p>
                  )}
                </div>
                <div className="app-actions">
                  <StatusBadge status={a.status} />
                  {a.status === 'pendiente' && (
                    <>
                      <button className="btn small" onClick={() => dispatch({ type: 'setStatus', id: a.id, status: 'aceptada' })}>Aceptar</button>
                      <button className="btn btn-ghost small" onClick={() => dispatch({ type: 'setStatus', id: a.id, status: 'rechazada' })}>No esta vez</button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : <div className="empty card">Todavía no hay solicitudes.</div>
      )}

      {tab === 'publicar' && <PublishForm onDone={() => setTab('mias')} />}

      {tab === 'mias' && (
        <ul className="app-list">
          {ownOps.map((o) => (
            <li key={o.id} className="card">
              <div>
                <a href={ROUTES.opportunity(o.id)}><strong>{o.title}</strong></a>
                <p className="muted small">{o.place} · {DURATIONS[o.duration].label}</p>
              </div>
              <span className="muted small">{state.applications.filter((a) => a.oppId === o.id).length} solicitudes</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function PublishForm({ onDone }) {
  const { dispatch } = useStore()
  const [f, setF] = useState(EMPTY_OP)
  const set = (patch) => setF((cur) => ({ ...cur, ...patch }))
  const valid = f.title.trim() && f.place.trim() && f.summary.trim()

  const submit = (e) => {
    e.preventDefault()
    if (!valid) return
    const [lat, lng] = PROVINCE_COORDS[f.province] ?? MAP_CENTER
    dispatch({
      type: 'publish',
      opportunity: {
        ...f,
        lat, lng,
        spots: Number(f.spots),
        activities: f.activities.split('\n').map((s) => s.trim()).filter(Boolean),
      },
    })
    onDone()
  }

  return (
    <form className="card form-card publish" onSubmit={submit}>
      <label>Título<input value={f.title} onChange={(e) => set({ title: e.target.value })} placeholder="Ej. Siembra de árboles en la cuenca del río" required /></label>
      <div className="row-2">
        <label>Provincia
          <select value={f.province} onChange={(e) => set({ province: e.target.value })}>
            {PROVINCES.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label>Lugar<input value={f.place} onChange={(e) => set({ place: e.target.value })} placeholder="Pueblo o zona" required /></label>
      </div>
      <div className="row-2">
        <label>Tipo
          <select value={f.type} onChange={(e) => set({ type: e.target.value })}>
            {Object.entries(labelsOf(TYPES)).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
        </label>
        <label>Duración
          <select value={f.duration} onChange={(e) => set({ duration: e.target.value })}>
            {Object.entries(labelsOf(DURATIONS)).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
        </label>
      </div>
      <label>Resumen<input value={f.summary} onChange={(e) => set({ summary: e.target.value })} placeholder="Una frase sobre qué se va a hacer" required /></label>
      <label>Actividades (una por línea)<textarea rows={3} value={f.activities} onChange={(e) => set({ activities: e.target.value })} /></label>
      <div className="row-2">
        <label>Horario<input value={f.schedule} onChange={(e) => set({ schedule: e.target.value })} /></label>
        <label>Cupos<input type="number" min={1} value={f.spots} onChange={(e) => set({ spots: e.target.value })} /></label>
      </div>
      <span className="label">Beneficios que ofreces</span>
      <ChipGroup name="Beneficios" options={BENEFITS} selected={f.benefits} onToggle={(k) => set({ benefits: toggleIn(f.benefits, k) })} />
      <span className="label">Habilidades que ayudan</span>
      <ChipGroup name="Habilidades" options={SKILLS} selected={f.skills} onToggle={(k) => set({ skills: toggleIn(f.skills, k) })} />
      <p className="hint">No pidas pagos ni depósitos a los voluntarios: va contra las reglas de VolunTico.</p>
      <button className="btn" disabled={!valid}>Publicar</button>
    </form>
  )
}
