import { useState } from 'react'
import { BRAND, PROVINCES, SKILLS, TYPES } from '../data/catalog'
import { ChipGroup, StatusBadge, asOptions, labelsOf, toggleIn } from '../components/ui'
import { OpportunityCard } from '../components/OpportunityCard'
import { ROUTES } from '../lib/router'
import { useStore } from '../lib/store'

export function Profile() {
  const { state, dispatch } = useStore()
  const p = state.profile
  const [confirming, setConfirming] = useState(false)
  const update = (profile) => dispatch({ type: 'updateProfile', profile })
  const mine = state.applications.filter((a) => a.mine)
  const favorites = state.opportunities.filter((o) => state.favorites.includes(o.id))
  const opById = (id) => state.opportunities.find((o) => o.id === id)

  // Derecho de acceso (Ley 8968): la persona descarga todo lo que la plataforma guarda de ella.
  const download = () => {
    const data = { perfil: p, favoritos: state.favorites, solicitudes: mine, exportado: new Date().toISOString() }
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
    const a = Object.assign(document.createElement('a'), { href: url, download: 'mis-datos-voluntico.json' })
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="wrap section">
      <h1>Mi perfil</h1>
      <div className="two-col">
        <section className="card form-card">
          <label>Nombre<input value={p.name} onChange={(e) => update({ name: e.target.value })} /></label>
          <label>Correo<input type="email" value={p.email} onChange={(e) => update({ email: e.target.value })} /></label>
          <span className="label">Mis habilidades</span>
          <ChipGroup name="Habilidades" options={SKILLS} selected={p.skills} onToggle={(k) => update({ skills: toggleIn(p.skills, k) })} />
          <span className="label">Me interesa</span>
          <ChipGroup name="Intereses" options={labelsOf(TYPES)} selected={p.interests} onToggle={(k) => update({ interests: toggleIn(p.interests, k) })} />
          <span className="label">Quiero conocer</span>
          <ChipGroup name="Provincias" options={asOptions(PROVINCES)} selected={p.provinces} onToggle={(k) => update({ provinces: toggleIn(p.provinces, k) })} />
          <p className="hint">Con esto armamos tus recomendaciones en <a href={ROUTES.explore}>Explorar</a>.</p>
        </section>

        <section>
          <h2>Mis solicitudes</h2>
          {mine.length ? (
            <ul className="app-list">
              {mine.map((a) => {
                const op = opById(a.oppId)
                return (
                  <li key={a.id} className="card">
                    <div>
                      <a href={ROUTES.opportunity(a.oppId)}><strong>{op?.title}</strong></a>
                      <p className="muted small">{op?.place}</p>
                    </div>
                    <div className="app-actions">
                      <StatusBadge status={a.status} />
                      {a.status === 'pendiente' && (
                        <button className="btn btn-ghost small" onClick={() => dispatch({ type: 'withdraw', id: a.id })}>Retirar</button>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : <p className="muted">Aún no has solicitado ningún voluntariado.</p>}

          <div className="card privacy">
            <h2>Mis datos</h2>
            <p className="small">
              Guardamos tu perfil, tus favoritos y tus solicitudes. No guardamos cédula ni dirección.
              Las alergias o datos de salud que escribas solo los ve la organización que te acepte.
            </p>
            <div className="row">
              <button className="btn btn-ghost small" onClick={download}>Descargar mis datos</button>
              {confirming ? (
                <>
                  <button className="btn btn-danger small" onClick={() => { dispatch({ type: 'deleteMyData' }); setConfirming(false) }}>Sí, borrar todo</button>
                  <button className="btn btn-ghost small" onClick={() => setConfirming(false)}>Cancelar</button>
                </>
              ) : (
                <button className="btn btn-ghost small" onClick={() => setConfirming(true)}>Borrar mi cuenta</button>
              )}
            </div>
            <p className="muted small">Otras consultas: {BRAND.supportEmail}</p>
          </div>
        </section>
      </div>

      <section className="section">
        <h2>Guardadas</h2>
        {favorites.length ? (
          <div className="grid">{favorites.map((op) => <OpportunityCard key={op.id} op={op} />)}</div>
        ) : <p className="muted">Toca el corazón de una oportunidad para guardarla aquí.</p>}
      </section>
    </div>
  )
}
