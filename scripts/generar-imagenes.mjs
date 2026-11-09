// Genera una ilustración SVG para cada producto de data/productos.json
// Uso: npm run imagenes
// Las imágenes se guardan en public/img/productos/<slug>.svg
// (Puede reemplazarlas por fotografías reales manteniendo la ruta del campo "imagen").
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const productos = JSON.parse(readFileSync(join(raiz, 'data/productos.json'), 'utf8'))
const destino = join(raiz, 'public/img/productos')
mkdirSync(destino, { recursive: true })

// Oscurece o aclara un color hex (factor negativo = oscurecer)
function ajustar(hex, factor) {
  const n = parseInt(hex.slice(1), 16)
  const canal = (c) => Math.max(0, Math.min(255, Math.round(factor < 0 ? c * (1 + factor) : c + (255 - c) * factor)))
  const r = canal(n >> 16), g = canal((n >> 8) & 255), b = canal(n & 255)
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
}

const siluetas = {
  tenis: (c, o) => `
    <path d="M40 212 Q40 238 72 238 L348 238 Q372 238 372 214 L372 204 L40 204 Z" fill="#fafafa" stroke="${o}" stroke-width="3"/>
    <path d="M48 206 L58 142 Q68 108 112 114 L150 120 Q172 152 214 150 L252 146 Q304 150 342 176 Q368 192 366 206 Z" fill="${c}" stroke="${o}" stroke-width="3"/>
    <path d="M150 120 Q172 152 214 150" fill="none" stroke="${o}" stroke-width="3"/>
    <g stroke="#fafafa" stroke-width="5" stroke-linecap="round"><path d="M178 138 L198 124"/><path d="M196 144 L216 130"/><path d="M214 148 L234 134"/></g>
    <path d="M90 190 Q170 160 280 182" fill="none" stroke="#fafafa" stroke-width="8" stroke-linecap="round" opacity=".85"/>`,
  formal: (c, o) => `
    <path d="M40 206 Q46 170 112 162 L172 150 Q234 150 292 176 Q344 188 366 204 L366 212 Q366 220 352 220 L120 220 L120 236 L62 236 L62 220 Q40 220 40 206 Z" fill="${o}"/>
    <path d="M44 204 Q50 168 112 160 L172 148 Q234 148 292 172 Q342 184 364 202 Z" fill="${c}" stroke="${o}" stroke-width="3"/>
    <path d="M150 154 Q190 170 236 160" fill="none" stroke="${ajustar(c, 0.35)}" stroke-width="4" stroke-linecap="round"/>
    <path d="M70 176 Q90 166 118 166" fill="none" stroke="${ajustar(c, 0.3)}" stroke-width="3" opacity=".7"/>`,
  tacon: (c, o) => `
    <path d="M70 120 Q60 112 74 104 Q100 98 120 112 L170 170 Q230 196 300 200 Q360 204 372 214 Q372 222 352 222 L210 222 Q160 210 120 180 L104 236 L90 236 L96 170 Z" fill="${c}" stroke="${o}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M120 112 Q150 170 230 190" fill="none" stroke="${ajustar(c, 0.35)}" stroke-width="3" opacity=".8"/>`,
  bota: (c, o) => `
    <path d="M60 214 Q60 240 88 240 L348 240 Q372 240 372 216 L372 206 L60 206 Z" fill="${o}"/>
    <path d="M68 208 L74 64 L172 64 L176 138 Q262 144 330 172 Q362 188 362 208 Z" fill="${c}" stroke="${o}" stroke-width="3"/>
    <path d="M74 84 L172 84" stroke="${ajustar(c, 0.3)}" stroke-width="5"/>
    <g stroke="${ajustar(c, 0.55)}" stroke-width="4" stroke-linecap="round"><path d="M150 96 L178 96"/><path d="M152 114 L184 116"/><path d="M160 132 L196 138"/></g>`,
  sandalia: (c, o) => `
    <path d="M40 210 Q40 228 64 228 L350 228 Q372 228 372 212 Q372 200 350 198 L64 198 Q40 198 40 210 Z" fill="${ajustar(c, -0.35)}" stroke="${o}" stroke-width="3"/>
    <path d="M60 200 Q60 190 80 190 L344 190 Q362 192 362 200 Z" fill="${ajustar(c, 0.5)}"/>
    <g fill="none" stroke="${c}" stroke-width="16" stroke-linecap="round">
      <path d="M110 192 Q120 130 160 140"/><path d="M200 192 Q230 130 290 192"/><path d="M90 192 Q70 150 110 140"/>
    </g>`,
  chancleta: (c, o) => `
    <path d="M40 212 Q40 230 66 230 L350 230 Q374 230 374 212 Q374 196 350 196 L66 196 Q40 196 40 212 Z" fill="${c}" stroke="${o}" stroke-width="3"/>
    <path d="M60 196 Q60 188 80 188 L348 188 Q364 190 364 196 Z" fill="${ajustar(c, 0.45)}"/>
    <path d="M150 190 Q220 110 300 190" fill="${ajustar(c, -0.15)}" stroke="${o}" stroke-width="3"/>`
}

function siluetaDe(p) {
  if (/Stiletto|Salón|Botín/.test(p.nombre)) return 'tacon'
  if (/Playa|Slide/.test(p.nombre)) return 'chancleta'
  switch (p.categoria) {
    case 'formales': return 'formal'
    case 'botas': return 'bota'
    case 'sandalias': return 'sandalia'
    default: return /Lluvia/.test(p.nombre) ? 'bota' : /Sandalia/.test(p.nombre) ? 'sandalia' : 'tenis'
  }
}

for (const p of productos) {
  const color = p.colorHex
  const contorno = ajustar(color, -0.55)
  const fondo = ajustar(color, 0.86)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" role="img" aria-label="${p.nombre}">
  <rect width="400" height="300" fill="${fondo}"/>
  <circle cx="300" cy="70" r="90" fill="${ajustar(color, 0.7)}" opacity=".6"/>
  <ellipse cx="206" cy="252" rx="170" ry="12" fill="#000" opacity=".08"/>
  ${siluetas[siluetaDe(p)](color, contorno)}
</svg>
`
  writeFileSync(join(destino, `${p.slug}.svg`), svg)
}
console.log(`Se generaron ${productos.length} imágenes en public/img/productos`)
