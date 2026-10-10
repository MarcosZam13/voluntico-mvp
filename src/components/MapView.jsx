import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MAP_CENTER, MAP_ZOOM, TYPES } from '../data/catalog'
import { ROUTES } from '../lib/router'

export function MapView({ opportunities, height = 460 }) {
  const el = useRef(null)
  const map = useRef(null)
  const layer = useRef(null)

  useEffect(() => {
    map.current = L.map(el.current, { scrollWheelZoom: false }).setView(MAP_CENTER, MAP_ZOOM)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 18,
    }).addTo(map.current)
    layer.current = L.layerGroup().addTo(map.current)
    return () => map.current.remove()
  }, [])

  useEffect(() => {
    layer.current.clearLayers()
    opportunities.forEach((op) => {
      L.circleMarker([op.lat, op.lng], {
        radius: 9, color: '#fff', weight: 2, fillColor: TYPES[op.type].color, fillOpacity: 0.95,
      })
        .bindPopup(`<strong>${op.title}</strong><br>${op.place}<br><a href="${ROUTES.opportunity(op.id)}">Ver oportunidad</a>`)
        .addTo(layer.current)
    })
  }, [opportunities])

  return <div ref={el} className="map" style={{ height }} />
}
