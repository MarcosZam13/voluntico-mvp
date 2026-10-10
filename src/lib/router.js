import { useEffect, useState } from 'react'

export const ROUTES = {
  home: '#/',
  explore: '#/explorar',
  profile: '#/perfil',
  org: '#/organizacion',
  opportunity: (id) => `#/oportunidad/${id}`,
}

function parse(hash) {
  const [, section = '', param] = hash.replace(/^#/, '').split('/')
  return { section, param }
}

export function useRoute() {
  const [route, setRoute] = useState(() => parse(window.location.hash))
  useEffect(() => {
    const onChange = () => {
      setRoute(parse(window.location.hash))
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}
