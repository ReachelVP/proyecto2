import { readFileSync } from 'node:fs'

// Se leen los JSON del catálogo para generar (prerender) todas las rutas del sitio estático
const leer = (ruta: string) => JSON.parse(readFileSync(new URL(ruta, import.meta.url), 'utf8'))
const productos = leer('./data/productos.json')
const categorias = leer('./data/categorias.json')
const { productosPorPagina } = leer('./data/tienda.json')

const paginas = (base: string, total: number) => {
  const n = Math.ceil(total / productosPorPagina)
  return Array.from({ length: n }, (_, i) => (i === 0 ? base : `${base}/${i + 1}`))
}

const rutas = [
  '/',
  '/buscar',
  ...paginas('/productos', productos.length),
  ...categorias.flatMap((c: any) =>
    paginas(`/categoria/${c.slug}`, productos.filter((p: any) => p.categoria === c.slug).length)
  ),
  ...productos.map((p: any) => `/producto/${p.slug}`)
]

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'Paso Firme · Tienda de zapatos',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Paso Firme: tienda en línea de zapatos deportivos, casuales, formales, botas, sandalias e infantiles.' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://app.snipcart.com' },
        { rel: 'preconnect', href: 'https://cdn.snipcart.com' }
      ]
    }
  },

  // Valores por defecto (la llave PÚBLICA de Snipcart puede ir en el código).
  // Se pueden sobrescribir con las variables NUXT_PUBLIC_SNIPCART_KEY y NUXT_PUBLIC_UTTERANCES_REPO
  runtimeConfig: {
    public: {
      snipcartKey:
        process.env.NUXT_PUBLIC_SNIPCART_KEY ||
        'YmEyZjg2MWMtNmVmMi00MDgwLWFlMjQtMjExMjRmOWRkOWVjNjM5Mjk3OTI1MzkxMDg1ODkz',
      utterancesRepo: process.env.NUXT_PUBLIC_UTTERANCES_REPO || 'ReachelVP/proyecto2',
      // URL pública del sitio (Netlify define la variable URL al construir).
      // Snipcart la usa para visitar la página del producto y validar el precio.
      siteUrl: process.env.URL || 'https://startling-lollipop-06f382.netlify.app'
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: rutas
    }
  }
})
