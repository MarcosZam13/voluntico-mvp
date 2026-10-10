# VolunTico MVP

Producto mínimo viable de VolunTico: plataforma que conecta personas que quieren viajar por Costa Rica con voluntariados en comunidades, a cambio de hospedaje, alimentación o experiencias.

Proyecto del curso Computación y Sociedad, TEC San Carlos, II Semestre 2026.

## Correr

```bash
npm install
npm run dev
```

## Qué incluye

**Viajero**
- Buscador con filtros por provincia, tipo, duración, beneficios y habilidades.
- Vista de lista y mapa de Costa Rica.
- Recomendaciones según el perfil (habilidades 50 %, intereses 30 %, provincias 20 %).
- Solicitud de participación con aviso de privacidad y consentimiento.
- Favoritos, estado de solicitudes y reseñas después de ser aceptado.
- Descargar o borrar sus datos.

**Organización**
- Recibir, aceptar o rechazar solicitudes.
- El correo y los datos de salud de la persona se muestran solo después de aceptarla.
- Publicar nuevas oportunidades.
- Insignia de organización verificada.

## Decisiones del MVP

- Sin backend: los datos viven en `localStorage` del navegador. "Reiniciar demo" en el pie de página vuelve al estado inicial.
- Sin inicio de sesión: un selector Viajero / Organización reemplaza la autenticación para poder mostrar los dos lados.
- Los datos de `src/data/seed.js` son ficticios.
- Las etiquetas y catálogos están centralizados en `src/data/catalog.js`.

## Privacidad (Ley 8968)

- Minimización: no se pide cédula ni dirección.
- El campo de salud o alimentación solo aparece si el proyecto da hospedaje o comida, y solo lo ve la organización si acepta.
- Consentimiento explícito antes de enviar una solicitud.
- Derecho de acceso (descargar datos) y supresión (borrar cuenta) desde el perfil.
