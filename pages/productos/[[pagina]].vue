<script setup lang="ts">
// Catálogo completo paginado: /productos y /productos/:pagina
const route = useRoute()
const { productos, paginar, tienda } = useCatalogo()

const numero = Number(route.params.pagina || 1)
const resultado = paginar(productos, numero)
if (!Number.isInteger(numero) || numero < 1 || numero > resultado.totalPaginas) {
  throw createError({ statusCode: 404, statusMessage: 'Página no encontrada', fatal: true })
}

useHead({ title: `Todos los productos${numero > 1 ? ` · Página ${numero}` : ''} · ${tienda.nombre}` })
</script>

<template>
  <div>
    <nav class="migas" aria-label="Ruta de navegación">
      <NuxtLink to="/">Inicio</NuxtLink> / <span>Todos los productos</span>
    </nav>

    <header class="encabezado">
      <h1>Todos los productos</h1>
      <p class="encabezado__conteo">
        {{ resultado.total }} productos · Página {{ resultado.pagina }} de {{ resultado.totalPaginas }}
      </p>
    </header>

    <div class="rejilla">
      <TarjetaProducto v-for="p in resultado.items" :key="p.id" :producto="p" />
    </div>

    <Paginacion :pagina="resultado.pagina" :total-paginas="resultado.totalPaginas" base="/productos" />
  </div>
</template>
