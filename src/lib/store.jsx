import { createContext, useContext, useEffect, useReducer } from 'react'
import { STORAGE_KEY } from '../data/catalog'
import {
  DEMO_ORG_ID, SEED_APPLICATIONS, SEED_OPPORTUNITIES, SEED_ORGS, SEED_PROFILE, SEED_REVIEWS,
} from '../data/seed'

const initialState = {
  role: 'viajero',
  orgId: DEMO_ORG_ID,
  orgs: SEED_ORGS,
  opportunities: SEED_OPPORTUNITIES,
  applications: SEED_APPLICATIONS,
  reviews: SEED_REVIEWS,
  profile: SEED_PROFILE,
  favorites: [],
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...initialState, ...JSON.parse(raw) } : initialState
  } catch {
    return initialState
  }
}

const newId = (prefix) => `${prefix}-${Date.now().toString(36)}`

function reducer(state, action) {
  switch (action.type) {
    case 'setRole':
      return { ...state, role: action.role }
    case 'toggleFavorite': {
      const has = state.favorites.includes(action.id)
      return { ...state, favorites: has ? state.favorites.filter((f) => f !== action.id) : [...state.favorites, action.id] }
    }
    case 'updateProfile':
      return { ...state, profile: { ...state.profile, ...action.profile } }
    case 'apply': {
      const now = new Date().toISOString()
      const app = { id: newId('app'), status: 'pendiente', createdAt: now, consentAt: now, mine: true, ...action.application }
      return { ...state, applications: [app, ...state.applications] }
    }
    case 'withdraw':
      return { ...state, applications: state.applications.filter((a) => a.id !== action.id) }
    case 'setStatus':
      return {
        ...state,
        applications: state.applications.map((a) => (a.id === action.id ? { ...a, status: action.status } : a)),
      }
    case 'publish': {
      const op = { id: newId('op'), orgId: state.orgId, ...action.opportunity }
      return { ...state, opportunities: [op, ...state.opportunities] }
    }
    case 'review': {
      const rv = { id: newId('rv'), ...action.review }
      return { ...state, reviews: [rv, ...state.reviews] }
    }
    case 'deleteMyData':
      // Derecho de supresión (Ley 8968): se borra perfil, favoritos y solicitudes propias.
      return {
        ...state,
        profile: { ...SEED_PROFILE, name: 'Invitado', skills: [], interests: [], provinces: [] },
        favorites: [],
        applications: state.applications.filter((a) => !a.mine),
      }
    case 'reset':
      return initialState
    default:
      return state
  }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Sin almacenamiento disponible la demo sigue funcionando en memoria.
    }
  }, [state])

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export function useStore() {
  return useContext(StoreContext)
}

export function useOrg(orgId) {
  const { state } = useStore()
  return state.orgs.find((o) => o.id === orgId)
}
