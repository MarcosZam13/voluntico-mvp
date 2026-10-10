// Datos de demostración. Organizaciones y personas son ficticias.

export const SEED_ORGS = [
  { id: 'org-bosque', name: 'Asociación Bosque Nuboso Vivo', province: 'Puntarenas', verified: true, about: 'Grupo comunitario que cuida senderos y viveros de especies nativas en la zona de Monteverde.' },
  { id: 'org-tortugas', name: 'Red Comunal Tortugas del Caribe', province: 'Limón', verified: true, about: 'Vecinos de Tortuguero que patrullan playas de anidación desde hace 15 años.' },
  { id: 'org-raices', name: 'Finca Raíces de La Fortuna', province: 'Alajuela', verified: true, about: 'Finca familiar orgánica que abre sus puertas a quien quiera aprender a sembrar.' },
  { id: 'org-escuela', name: 'Escuela Rural Los Ángeles', province: 'Alajuela', verified: true, about: 'Escuela unidocente de San Carlos con 34 estudiantes.' },
  { id: 'org-artesanas', name: 'Cooperativa Artesanas Chorotegas', province: 'Guanacaste', verified: true, about: 'Mujeres ceramistas que buscan vender en línea su trabajo.' },
  { id: 'org-cafe', name: 'Familia Solano, Café de Altura', province: 'Cartago', verified: false, about: 'Productores de café en las faldas del volcán Turrialba.' },
  { id: 'org-osa', name: 'Reforesta Osa', province: 'Puntarenas', verified: true, about: 'Proyecto de restauración de corredores biológicos en la península de Osa.' },
  { id: 'org-sarapiqui', name: 'Albergue Comunal Río Sarapiquí', province: 'Heredia', verified: true, about: 'Albergue manejado por una asociación de desarrollo que vive del turismo de aves.' },
  { id: 'org-comedor', name: 'Comedor Social Manos Abiertas', province: 'San José', verified: true, about: 'Sirve almuerzos a más de 120 personas cada día en el centro de San José.' },
]

export const SEED_OPPORTUNITIES = [
  {
    id: 'op-monteverde', orgId: 'org-bosque', title: 'Conservación del bosque nuboso',
    province: 'Puntarenas', place: 'Monteverde', lat: 10.301, lng: -84.825,
    type: 'ambiental', duration: 'semana', benefits: ['hospedaje', 'alimentacion'],
    skills: ['campo', 'fotografia'], spots: 4,
    summary: 'Cinco días ayudando en el vivero y en el mantenimiento de senderos.',
    activities: ['Siembra en el vivero de especies nativas', 'Limpieza y señalización de senderos', 'Registro fotográfico de aves para el inventario'],
    schedule: 'Lunes a viernes, 7:00 a 12:00. Tardes libres para conocer la zona.',
  },
  {
    id: 'op-tortuguero', orgId: 'org-tortugas', title: 'Patrullaje de anidación de tortugas',
    province: 'Limón', place: 'Tortuguero', lat: 10.543, lng: -83.502,
    type: 'ambiental', duration: 'semana', benefits: ['hospedaje'],
    skills: ['campo', 'idiomas'], spots: 6,
    summary: 'Patrullas nocturnas en la playa para proteger nidos de tortuga verde.',
    activities: ['Patrullas nocturnas acompañadas por guías locales', 'Conteo y marcaje de nidos', 'Charlas a turistas sobre conservación'],
    schedule: 'Turnos de 20:00 a 00:00, temporada de julio a octubre.',
  },
  {
    id: 'op-fortuna', orgId: 'org-raices', title: 'Fin de semana en finca orgánica',
    province: 'Alajuela', place: 'La Fortuna, San Carlos', lat: 10.471, lng: -84.645,
    type: 'comunitario', duration: 'finde', benefits: ['alimentacion', 'experiencias'],
    skills: ['agricultura', 'cocina'], spots: 5,
    summary: 'Cosecha, compostaje y cocina con lo que da la finca, con vista al volcán Arenal.',
    activities: ['Cosecha de hortalizas y frutas', 'Preparación de compost', 'Almuerzo típico cocinado en grupo'],
    schedule: 'Sábado y domingo, 8:00 a 14:00. Incluye visita a aguas termales del pueblo.',
  },
  {
    id: 'op-quesada', orgId: 'org-escuela', title: 'Clases de inglés en escuela rural',
    province: 'Alajuela', place: 'Ciudad Quesada', lat: 10.3238, lng: -84.4271,
    type: 'educativo', duration: 'mas', benefits: ['hospedaje', 'alimentacion'],
    skills: ['idiomas', 'ensenanza'], spots: 2,
    summary: 'Dos semanas apoyando a la docente con conversación en inglés para primaria.',
    activities: ['Juegos y conversación en inglés', 'Apoyo en tareas por la tarde', 'Hospedaje con una familia de la comunidad'],
    schedule: 'Lunes a viernes, 7:30 a 12:30, durante el curso lectivo.',
  },
  {
    id: 'op-puertoviejo', orgId: 'org-tortugas', title: 'Limpieza de playa en Puerto Viejo',
    province: 'Limón', place: 'Puerto Viejo de Talamanca', lat: 9.656, lng: -82.754,
    type: 'ambiental', duration: 'dia', benefits: ['descuentos'],
    skills: [], spots: 30,
    summary: 'Una mañana de limpieza y clasificación de residuos con la comunidad.',
    activities: ['Recolección de residuos en la costa', 'Clasificación para reciclaje', 'Descuento en tours locales aliados'],
    schedule: 'Último sábado de cada mes, 7:00 a 11:00.',
  },
  {
    id: 'op-nicoya', orgId: 'org-artesanas', title: 'Redes sociales para cooperativa de artesanas',
    province: 'Guanacaste', place: 'Guaitil, Santa Cruz', lat: 10.205, lng: -85.534,
    type: 'comunitario', duration: 'semana', benefits: ['hospedaje', 'alimentacion', 'experiencias'],
    skills: ['redes', 'fotografia'], spots: 2,
    summary: 'Fotografiar las piezas y dejar listas las redes y el catálogo de la cooperativa.',
    activities: ['Sesión de fotos de producto', 'Configurar perfiles de redes y catálogo', 'Taller de cerámica chorotega'],
    schedule: 'Horario flexible, unas 5 horas al día.',
  },
  {
    id: 'op-turrialba', orgId: 'org-cafe', title: 'Cosecha de café con familia productora',
    province: 'Cartago', place: 'Turrialba', lat: 9.905, lng: -83.683,
    type: 'turistico', duration: 'finde', benefits: ['hospedaje', 'alimentacion', 'experiencias'],
    skills: ['agricultura'], spots: 4,
    summary: 'Recolectar café, conocer el beneficiado y tostar tu propia bolsa para llevar.',
    activities: ['Recolección de café', 'Recorrido por el beneficio', 'Tueste y catación'],
    schedule: 'Temporada de noviembre a febrero.',
  },
  {
    id: 'op-osa', orgId: 'org-osa', title: 'Reforestación de corredor biológico',
    province: 'Puntarenas', place: 'Puerto Jiménez, Osa', lat: 8.534, lng: -83.307,
    type: 'ambiental', duration: 'mas', benefits: ['hospedaje', 'alimentacion'],
    skills: ['agricultura', 'campo'], spots: 8,
    summary: 'Dos a cuatro semanas sembrando árboles para conectar parches de bosque.',
    activities: ['Siembra de árboles nativos', 'Monitoreo de plántulas', 'Salidas a Corcovado en días libres'],
    schedule: 'Lunes a sábado, 6:30 a 11:30.',
  },
  {
    id: 'op-sanjose', orgId: 'org-comedor', title: 'Voluntariado en comedor social',
    province: 'San José', place: 'Barrio Amón, San José', lat: 9.938, lng: -84.077,
    type: 'social', duration: 'dia', benefits: ['alimentacion'],
    skills: ['cocina'], spots: 10,
    summary: 'Preparar y servir almuerzos durante una mañana.',
    activities: ['Preparación de alimentos', 'Servicio de almuerzo', 'Limpieza de cocina'],
    schedule: 'Lunes a sábado, 9:00 a 13:00.',
  },
  {
    id: 'op-sarapiqui', orgId: 'org-sarapiqui', title: 'Guía bilingüe de aves para el albergue',
    province: 'Heredia', place: 'Puerto Viejo de Sarapiquí', lat: 10.452, lng: -84.017,
    type: 'turistico', duration: 'semana', benefits: ['hospedaje', 'experiencias'],
    skills: ['idiomas', 'fotografia'], spots: 2,
    summary: 'Armar con los guías locales una guía de aves en inglés y español, con fotos propias.',
    activities: ['Salidas de observación al amanecer', 'Fotografía de especies', 'Redacción de fichas bilingües'],
    schedule: 'Salidas de 5:30 a 9:00, tardes de edición.',
  },
  {
    id: 'op-orosi', orgId: 'org-cafe', title: 'Página web para hospedaje rural',
    province: 'Cartago', place: 'Valle de Orosi', lat: 9.796, lng: -83.856,
    type: 'comunitario', duration: 'semana', benefits: ['hospedaje'],
    skills: ['programacion', 'fotografia'], spots: 1,
    summary: 'Crear una página sencilla con reservas por WhatsApp para un hospedaje familiar.',
    activities: ['Levantar requisitos con la familia', 'Construir y publicar la página', 'Capacitar a la familia para actualizarla'],
    schedule: 'Horario flexible, a coordinar.',
  },
]

export const SEED_APPLICATIONS = [
  {
    id: 'app-1', oppId: 'op-monteverde', name: 'Daniela Rojas', email: 'daniela@example.com',
    skills: ['fotografia', 'campo'], message: 'Estudio biología y me encantaría ayudar con el registro de aves.',
    sensitive: 'Alergia al maní.', status: 'pendiente', createdAt: '2026-10-02T15:20:00Z', consentAt: '2026-10-02T15:20:00Z', mine: false,
  },
  {
    id: 'app-2', oppId: 'op-monteverde', name: 'Lukas Weber', email: 'lukas@example.com',
    skills: ['idiomas', 'campo'], message: 'Voy a estar en Costa Rica tres semanas y quiero conocer Monteverde ayudando.',
    sensitive: '', status: 'aceptada', createdAt: '2026-09-28T10:05:00Z', consentAt: '2026-09-28T10:05:00Z', mine: false,
  },
]

export const SEED_REVIEWS = [
  { id: 'rv-1', oppId: 'op-monteverde', author: 'Lukas W.', rating: 5, text: 'La familia anfitriona fue increíble y aprendí muchísimo del vivero.' },
  { id: 'rv-2', oppId: 'op-fortuna', author: 'Sofía M.', rating: 5, text: 'Cocinar con lo que cosechamos fue lo mejor del viaje.' },
  { id: 'rv-3', oppId: 'op-tortuguero', author: 'Andrés C.', rating: 4, text: 'Ver una tortuga desovar no tiene precio. Llevar repelente.' },
  { id: 'rv-4', oppId: 'op-sanjose', author: 'María P.', rating: 5, text: 'Muy bien organizados, en una mañana se siente que uno aporta.' },
]

export const SEED_PROFILE = {
  name: 'Invitado',
  email: '',
  skills: ['fotografia', 'idiomas'],
  interests: ['ambiental', 'comunitario'],
  provinces: ['Guanacaste', 'Puntarenas'],
}

// Organización con la que se entra al panel en la demo.
export const DEMO_ORG_ID = 'org-bosque'
