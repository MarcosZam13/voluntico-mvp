import { MATCH_WEIGHTS, SKILLS, TYPES } from '../data/catalog'

// Recomendación por perfil: puntaje 0-100 según habilidades, intereses y provincias.
export function matchScore(op, profile) {
  const reasons = []
  let score = 0

  if (op.skills.length === 0) {
    // Abierta a cualquiera, pero no debe ganarle a una que sí aprovecha tus habilidades.
    score += Math.round(MATCH_WEIGHTS.skills / 2)
    reasons.push('No pide experiencia previa')
  } else {
    const shared = op.skills.filter((s) => profile.skills.includes(s))
    score += Math.round((shared.length / op.skills.length) * MATCH_WEIGHTS.skills)
    if (shared.length) reasons.push(`Usa tu habilidad: ${shared.map((s) => SKILLS[s]).join(', ')}`)
  }

  if (profile.interests.includes(op.type)) {
    score += MATCH_WEIGHTS.type
    reasons.push(`Te interesa lo ${TYPES[op.type].label.toLowerCase()}`)
  }

  if (profile.provinces.includes(op.province)) {
    score += MATCH_WEIGHTS.province
    reasons.push(`Quieres visitar ${op.province}`)
  }

  return { score, reasons }
}

export function recommend(opportunities, profile, limit) {
  return opportunities
    .map((op) => ({ op, ...matchScore(op, profile) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}
