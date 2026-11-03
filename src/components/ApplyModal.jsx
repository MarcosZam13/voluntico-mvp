import { useState } from 'react'
import { BENEFITS_NEEDING_HEALTH_INFO, BRAND, SKILLS, TERMS } from '../data/catalog'
import { useStore } from '../lib/store'
import { ChipGroup, toggleIn } from './ui'

export function ApplyModal({ op, onClose, onDone }) {
  const { state, dispatch } = useStore()
  const [form, setForm] = useState({
    name: state.profile.name === 'Invitado' ? '' : state.profile.name,
    email: state.profile.email,
    skills: state.profile.skills,
    message: '',
    sensitive: '',
    adult: false,
    consent: false,
  })
  const asksHealth = op.benefits.some((b) => BENEFITS_NEEDING_HEALTH_INFO.includes(b))
  const set = (patch) => setForm((f) => ({ ...f, ...patch }))
  const valid = form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && form.adult && form.consent

  const submit = (e) => {
    e.preventDefault()
    if (!valid) return
    const { adult, consent, ...application } = form
    dispatch({ type: 'apply', application: { ...application, oppId: op.id } })
    dispatch({ type: 'updateProfile', profile: { name: form.name, email: form.email } })
    onDone()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit} aria-label="Solicitud de participación">
        <h2>Solicitar participar</h2>
        <p className="muted">{op.title} · {op.place}</p>

        <label>Nombre<input value={form.name} onChange={(e) => set({ name: e.target.value })} required /></label>
        <label>Correo<input type="email" value={form.email} onChange={(e) => set({ email: e.target.value })} required /></label>

        <span className="label">Habilidades que aportas</span>
        <ChipGroup name="Habilidades" options={SKILLS} selected={form.skills} onToggle={(k) => set({ skills: toggleIn(form.skills, k) })} />

        <label>¿Por qué te interesa?
          <textarea rows={3} value={form.message} onChange={(e) => set({ message: e.target.value })} />
        </label>

        {asksHealth && (
          <label>Alergias o necesidades de salud (opcional)
            <textarea rows={2} value={form.sensitive} onChange={(e) => set({ sensitive: e.target.value })} />
            <span className="hint">
              Este proyecto incluye hospedaje o alimentación. Este dato solo lo verá la organización
              si acepta tu solicitud, nunca se publica.
            </span>
          </label>
        )}

        <div className="notice">
          <strong>Antes de enviar</strong>
          <p>
            Enviamos tu nombre, correo, habilidades y mensaje solo a la organización de este proyecto,
            para que evalúe tu solicitud. No pedimos cédula ni dirección. Puedes ver, descargar o borrar
            tus datos desde tu perfil o escribiendo a {BRAND.supportEmail}; respondemos en un máximo de {BRAND.dataRequestDays} días hábiles.
          </p>
          <label className="check">
            <input type="checkbox" checked={form.consent} onChange={(e) => set({ consent: e.target.checked })} />
            Entiendo y acepto que mis datos se usen para esta solicitud.
          </label>
          <p>{TERMS.applyNotEmployment}</p>
          <label className="check">
            <input type="checkbox" checked={form.adult} onChange={(e) => set({ adult: e.target.checked })} />
            {TERMS.applyAdult}
          </label>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn" disabled={!valid}>Enviar solicitud</button>
        </div>
      </form>
    </div>
  )
}
