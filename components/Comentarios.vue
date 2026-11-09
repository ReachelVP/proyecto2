<script setup lang="ts">
// Comentarios con utterances (https://utteranc.es): cada producto crea/usa un issue
// en el repositorio de GitHub configurado en NUXT_PUBLIC_UTTERANCES_REPO.
const props = defineProps<{ termino: string }>()
const { public: config } = useRuntimeConfig()
const contenedor = ref<HTMLElement | null>(null)

function cargar() {
  if (!contenedor.value || !config.utterancesRepo) return
  contenedor.value.innerHTML = ''
  const script = document.createElement('script')
  script.src = 'https://utteranc.es/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('repo', config.utterancesRepo as string)
  script.setAttribute('issue-term', props.termino)
  script.setAttribute('label', 'comentario')
  script.setAttribute('theme', 'github-light')
  contenedor.value.appendChild(script)
}

onMounted(cargar)
watch(() => props.termino, cargar)
</script>

<template>
  <section class="comentarios" aria-labelledby="titulo-comentarios">
    <h2 id="titulo-comentarios">Comentarios</h2>
    <p class="comentarios__ayuda">Inicie sesión con GitHub para dejar su opinión sobre este producto.</p>
    <div ref="contenedor" />
    <p v-if="!config.utterancesRepo" class="aviso">
      Los comentarios aún no están configurados: defina <code>NUXT_PUBLIC_UTTERANCES_REPO</code> (ver README).
    </p>
  </section>
</template>
