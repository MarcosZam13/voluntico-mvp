import { BRAND, ROLES } from '../data/catalog'
import { ROUTES } from '../lib/router'
import { useStore } from '../lib/store'

export function Header({ section }) {
  const { state, dispatch } = useStore()
  const links = state.role === 'viajero'
    ? [['explorar', ROUTES.explore, 'Explorar'], ['perfil', ROUTES.profile, 'Mi perfil']]
    : [['organizacion', ROUTES.org, 'Panel'], ['explorar', ROUTES.explore, 'Ver plataforma']]

  const switchRole = (role) => {
    dispatch({ type: 'setRole', role })
    window.location.hash = role === 'viajero' ? ROUTES.explore : ROUTES.org
  }

  return (
    <header className="header">
      <div className="wrap header-row">
        <a href={ROUTES.home} className="logo">
          <span className="logo-mark" aria-hidden="true" />
          {BRAND.name}
        </a>
        <nav className="nav">
          {links.map(([key, href, label]) => (
            <a key={key} href={href} className={section === key ? 'active' : ''}>{label}</a>
          ))}
        </nav>
        <div className="role-switch" role="group" aria-label="Entrar como">
          {Object.entries(ROLES).map(([key, label]) => (
            <button key={key} className={state.role === key ? 'on' : ''} onClick={() => switchRole(key)}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  const { dispatch } = useStore()
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <div>
          <strong>{BRAND.name}</strong> · {BRAND.tagline}
          <p className="muted small">
            MVP con datos de demostración: las organizaciones y personas que aparecen son ficticias.
            Consultas de privacidad: {BRAND.supportEmail}
          </p>
        </div>
        <button className="btn btn-ghost small" onClick={() => dispatch({ type: 'reset' })}>
          Reiniciar demo
        </button>
      </div>
    </footer>
  )
}
