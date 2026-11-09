<script setup lang="ts">
// Lista paginada de los productos de una categoría: /categoria/:slug y /categoria/:slug/:pagina
const route = useRoute()
const { categoriaPorSlug, productosDeCategoria, paginar, tienda } = useCatalogo()

const slug = String(route.params.slug)
const categoria = categoriaPorSlug(slug)
if (!categoria) {
  throw createError({ statusCode: 404, statusMessage: 'Categoría no encontrada', fatal: true })
}

const numero = Number(route.params.pagina || 1)
const resultado = paginar(productosDeCategoria(slug), numero)
if (!Number.isInteger(numero) || numero < 1 || numero > resultado.totalPaginas) {
  throw createError({ statusCode: 404, statusMessage: 'Página no encontrada', fatal: true })
}

useHead({ title: `${categoria.nombre}${numero > 1 ? ` · Página ${numero}` : ''} · ${tienda.nombre}` })
</script>

<template>
  <div>
    <nav class="migas" aria-label="Ruta de navegación">
      <NuxtLink to="/">Inicio</NuxtLink> / <span>{{ categoria!.nombre }}</span>
    </nav>

    <header class="encabezado">
      <h1>{{ categoria!.nombre }}</h1>
      <p>{{ categoria!.descripcion }}</p>
      <p class="encabezado__conteo">
        {{ resultado.total }} productos · Página {{ resultado.pagina }} de {{ resultado.totalPaginas }}
      </p>
    </header>

    <div class="rejilla">
      <TarjetaProducto v-for="p in resultado.items" :key="p.id" :producto="p" />
    </div>

    <Paginacion :pagina="resultado.pagina" :total-paginas="resultado.totalPaginas" :base="`/categoria/${slug}`" />
  </div>
</template>
