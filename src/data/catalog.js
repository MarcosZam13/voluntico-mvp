// Catálogos de la plataforma: toda etiqueta visible sale de aquí.

export const BRAND = {
  name: 'VolunTico',
  tagline: 'Viaja, ayuda y descubre Costa Rica.',
  supportEmail: 'soporte@voluntico.cr',
  dataRequestDays: 10,
}

export const PROVINCES = [
  'San José',
  'Alajuela',
  'Cartago',
  'Heredia',
  'Guanacaste',
  'Puntarenas',
  'Limón',
]

export const TYPES = {
  ambiental: { label: 'Ambiental', color: '#15803d' },
  social: { label: 'Social', color: '#c2410c' },
  educativo: { label: 'Educativo', color: '#1d4ed8' },
  turistico: { label: 'Turístico', color: '#a21caf' },
  comunitario: { label: 'Comunitario', color: '#b45309' },
}

export const DURATIONS = {
  dia: { label: 'Un día', order: 1 },
  finde: { label: 'Fin de semana', order: 2 },
  semana: { label: 'Una semana', order: 3 },
  mas: { label: 'Más de una semana', order: 4 },
}

export const BENEFITS = {
  hospedaje: 'Hospedaje',
  alimentacion: 'Alimentación',
  descuentos: 'Descuentos',
  experiencias: 'Experiencias',
}

// Beneficios que obligan a la organización a conocer necesidades de salud o
// alimentación de la persona (dato sensible, Ley 8968).
export const BENEFITS_NEEDING_HEALTH_INFO = ['hospedaje', 'alimentacion']

export const SKILLS = {
  programacion: 'Programación',
  idiomas: 'Idiomas',
  ensenanza: 'Enseñanza',
  agricultura: 'Agricultura',
  fotografia: 'Fotografía',
  redes: 'Redes sociales',
  campo: 'Trabajo de campo',
  cocina: 'Cocina',
}

export const APPLICATION_STATUS = {
  pendiente: { label: 'Pendiente', tone: 'warn' },
  aceptada: { label: 'Aceptada', tone: 'ok' },
  rechazada: { label: 'No seleccionada', tone: 'muted' },
}

export const ROLES = {
  viajero: 'Viajero',
  organizacion: 'Organización',
}

// Pesos de la recomendación por perfil (suman 100).
export const MATCH_WEIGHTS = {
  skills: 50,
  type: 30,
  province: 20,
}

export const MAP_CENTER = [9.95, -84.15]
export const MAP_ZOOM = 7
export const STORAGE_KEY = 'voluntico-mvp-v1'
