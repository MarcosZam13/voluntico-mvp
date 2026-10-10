import { BRAND, PROVINCES } from '../data/catalog'
import { MapView } from '../components/MapView'
import { OpportunityCard } from '../components/OpportunityCard'
import { ROUTES } from '../lib/router'
import { useStore } from '../lib/store'

const FEATURED_COUNT = 3

const TRAVELER_STEPS = [
  ['Busca', 'Filtra por provincia, tipo de voluntariado, duración, beneficios y habilidades.'],
  ['Solicita', 'Envía tu solicitud a la organización con un perfil corto. Sin cédula ni dirección.'],
  ['Viaja y ayuda', 'Colabora con la comunidad y recibe hospedaje, comida o experiencias según lo publicado.'],
]

const ORG_STEPS = [
  ['Verifícate', 'Validamos la identidad de cada organización antes de que publique, para evitar ofertas falsas.'],
  ['Publica', 'Describe qué ayuda necesitas, las actividades y los beneficios que ofreces.'],
  ['Elige', 'Revisa perfiles y acepta a las personas que mejor calzan con tu proyecto.'],
]

export function Home() {
  const { state } = useStore()
  const provinces = new Set(state.opportunities.map((o) => o.province))
  const verified = state.orgs.filter((o) => o.verified).length

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Turismo de voluntariado en Costa Rica</p>
            <h1>{BRAND.tagline}</h1>
            <p className="lead">
              Las oportunidades de voluntariado hoy están regadas en grupos de Facebook, páginas sueltas y
              mensajes directos. VolunTico las junta en un solo lugar y conecta a quien quiere viajar
              con comunidades que necesitan manos.
            </p>
            <div className="hero-actions">
              <a className="btn btn-lg" href={ROUTES.explore}>Explorar oportunidades</a>
              <a className="btn btn-ghost btn-lg" href={ROUTES.org}>Soy una organización</a>
            </div>
            <dl className="stats">
              <div><dt>{state.opportunities.length}</dt><dd>oportunidades</dd></div>
              <div><dt>{provinces.size} de {PROVINCES.length}</dt><dd>provincias</dd></div>
              <div><dt>{verified}</dt><dd>organizaciones verificadas</dd></div>
            </dl>
          </div>
          <MapView opportunities={state.opportunities} height={420} />
        </div>
      </section>

      <section className="wrap section">
        <div className="two-col">
          <Steps title="Para viajeros" steps={TRAVELER_STEPS} />
          <Steps title="Para organizaciones" steps={ORG_STEPS} />
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Para empezar</h2>
          <a href={ROUTES.explore}>Ver todas</a>
        </div>
        <div className="grid">
          {state.opportunities.slice(0, FEATURED_COUNT).map((op) => <OpportunityCard key={op.id} op={op} />)}
        </div>
      </section>
    </>
  )
}

function Steps({ title, steps }) {
  return (
    <div className="card steps">
      <h2>{title}</h2>
      <ol>
        {steps.map(([name, text]) => (
          <li key={name}><strong>{name}</strong><span>{text}</span></li>
        ))}
      </ol>
    </div>
  )
}
