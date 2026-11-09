<script setup lang="ts">
// Resultados de búsqueda: /buscar?q=palabras+clave
// Los resultados se calculan en el navegador (el sitio es estático).
const route = useRoute()
const { buscar, tienda } = useCatalogo()

const consulta = computed(() => String(route.query.q ?? '').trim())
const resultados = computed(() => buscar(consulta.value))
const sugerencias = ['running', 'cuero', 'negro', 'mujer', 'impermeable', 'Pasitos', 'tacón']

useHead({ title: `Buscar · ${tienda.nombre}` })
</script>

<template>
  <div>
    <nav class="migas" aria-label="Ruta de navegación">
      <NuxtLink to="/">Inicio</NuxtLink> / <span>Buscar</span>
    </nav>

    <header class="encabezado">
      <h1>Buscar productos</h1>
      <p>Busque por nombre, marca, tipo, color, material, género o categoría.</p>
      <FormularioBusqueda class="busqueda--grande" />
      <p class="sugerencias">
        Pruebe:
        <NuxtLink v-for="s in sugerencias" :key="s" :to="{ path: '/buscar', query: { q: s } }">{{ s }}</NuxtLink>
      </p>
    </header>

    <ClientOnly>
      <template v-if="consulta">
        <p class="encabezado__conteo" role="status">
          {{ resultados.productos.length }} resultado(s) para «{{ consulta }}»
        </p>

        <div v-if="resultados.categorias.length" class="chips">
          <span>Categorías:</span>
          <NuxtLink v-for="c in resultados.categorias" :key="c.slug" :to="`/categoria/${c.slug}`" class="chip">
            {{ c.nombre }}
          </NuxtLink>
        </div>

        <div v-if="resultados.productos.length" class="rejilla">
          <TarjetaProducto v-for="p in resultados.productos" :key="p.id" :producto="p" />
        </div>
        <p v-else class="vacio">No encontramos productos con esas palabras. Intente con otros términos.</p>
      </template>
    </ClientOnly>
  </div>
</template>
