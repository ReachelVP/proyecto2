<script setup lang="ts">
const route = useRoute()
const texto = ref(String(route.query.q ?? ''))
watch(() => route.query.q, (q) => (texto.value = String(q ?? '')))

function enviar() {
  const q = texto.value.trim()
  navigateTo({ path: '/buscar', query: q ? { q } : {} })
}
</script>

<template>
  <form class="busqueda" role="search" @submit.prevent="enviar">
    <label class="sr-only" for="campo-busqueda">Buscar productos</label>
    <input
      id="campo-busqueda"
      v-model="texto"
      type="search"
      placeholder="Buscar: running, cuero, negro, botas…"
      autocomplete="off"
    />
    <button type="submit" aria-label="Buscar">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
      </svg>
    </button>
  </form>
</template>
