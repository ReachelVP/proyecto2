<script setup lang="ts">
import type { Producto } from '~/composables/useCatalogo'
defineProps<{ producto: Producto }>()
const { categoriaPorSlug } = useCatalogo()
</script>

<template>
  <article class="tarjeta">
    <NuxtLink :to="`/producto/${producto.slug}`" class="tarjeta__enlace">
      <img :src="producto.imagen" :alt="producto.nombre" loading="lazy" width="400" height="300" />
      <div class="tarjeta__cuerpo">
        <p class="tarjeta__meta">{{ categoriaPorSlug(producto.categoria)?.nombre }} · {{ producto.marca }}</p>
        <h3 class="tarjeta__titulo">{{ producto.nombre }}</h3>
        <p class="tarjeta__tipo">{{ producto.tipo }} · {{ producto.genero }}</p>
      </div>
    </NuxtLink>
    <div class="tarjeta__pie">
      <span class="precio">{{ formatoPrecio(producto.precio) }}</span>
      <BotonComprar :producto="producto" compacto />
    </div>
  </article>
</template>
