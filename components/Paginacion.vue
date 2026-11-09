<script setup lang="ts">
// base: ruta de la primera página (p.ej. /categoria/botas). Las demás son base/2, base/3…
const props = defineProps<{ pagina: number; totalPaginas: number; base: string }>()

const enlace = (n: number) => (n <= 1 ? props.base : `${props.base}/${n}`)
const numeros = computed(() => Array.from({ length: props.totalPaginas }, (_, i) => i + 1))
</script>

<template>
  <nav v-if="totalPaginas > 1" class="paginacion" aria-label="Paginación">
    <NuxtLink v-if="pagina > 1" :to="enlace(pagina - 1)" class="paginacion__paso" rel="prev">← Anterior</NuxtLink>
    <span v-else class="paginacion__paso paginacion__paso--off">← Anterior</span>

    <ul class="paginacion__numeros">
      <li v-for="n in numeros" :key="n">
        <NuxtLink :to="enlace(n)" :aria-current="n === pagina ? 'page' : undefined" :class="{ activa: n === pagina }">
          {{ n }}
        </NuxtLink>
      </li>
    </ul>

    <NuxtLink v-if="pagina < totalPaginas" :to="enlace(pagina + 1)" class="paginacion__paso" rel="next">Siguiente →</NuxtLink>
    <span v-else class="paginacion__paso paginacion__paso--off">Siguiente →</span>
  </nav>
</template>
