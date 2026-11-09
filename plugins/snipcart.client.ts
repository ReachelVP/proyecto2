// Carga Snipcart v3 en el navegador.
// El <div id="snipcart"> se agrega fuera de la app de Vue para que Nuxt no lo vuelva a renderizar.
const VERSION = '3.7.1'

export default defineNuxtPlugin(() => {
  const { public: config } = useRuntimeConfig()

  if (!config.snipcartKey) {
    console.warn('[Snipcart] Falta la llave pública. Defina NUXT_PUBLIC_SNIPCART_KEY (ver README).')
  }

  if (document.getElementById('snipcart')) return

  const contenedor = document.createElement('div')
  contenedor.id = 'snipcart'
  contenedor.hidden = true
  contenedor.dataset.apiKey = config.snipcartKey as string
  contenedor.dataset.configModalStyle = 'side'
  contenedor.dataset.currency = 'usd'
  document.body.appendChild(contenedor)

  const estilos = document.createElement('link')
  estilos.rel = 'stylesheet'
  estilos.href = `https://cdn.snipcart.com/themes/v${VERSION}/default/snipcart.css`
  document.head.appendChild(estilos)

  const script = document.createElement('script')
  script.src = `https://cdn.snipcart.com/themes/v${VERSION}/default/snipcart.js`
  script.async = true
  document.body.appendChild(script)
})
