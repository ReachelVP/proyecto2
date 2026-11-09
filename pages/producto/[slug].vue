<script setup lang="ts">
// Detalle de un producto: /producto/:slug
const route = useRoute()
const { productoPorSlug, categoriaPorSlug, productosDeCategoria, tienda } = useCatalogo()

const producto = productoPorSlug(String(route.params.slug))
if (!producto) {
  throw createError({ statusCode: 404, statusMessage: 'Producto no encontrado', fatal: true })
}

const categoria = categoriaPorSlug(producto.categoria)!
const relacionados = productosDeCategoria(producto.categoria).filter((p) => p.id !== producto.id).slice(0, 4)
const talla = ref<number>(producto.tallas[0])

useHead({
  title: `${producto.nombre} · ${tienda.nombre}`,
  meta: [{ name: 'description', content: producto.descripcion }]
})
</script>

<template>
  <div v-if="producto">
    <nav class="migas" aria-label="Ruta de navegación">
      <NuxtLink to="/">Inicio</NuxtLink> /
      <NuxtLink :to="`/categoria/${categoria.slug}`">{{ categoria.nombre }}</NuxtLink> /
      <span>{{ producto.nombre }}</span>
    </nav>

    <article class="detalle">
      <img class="detalle__imagen" :src="producto.imagen" :alt="producto.nombre" width="400" height="300" />

      <div class="detalle__info">
        <p class="tarjeta__meta">{{ producto.marca }} · {{ producto.tipo }}</p>
        <h1>{{ producto.nombre }}</h1>
        <p class="detalle__precio">{{ formatoPrecio(producto.precio) }}</p>
        <p>{{ producto.descripcion }}</p>

        <dl class="ficha">
          <div><dt>Marca</dt><dd>{{ producto.marca }}</dd></div>
          <div><dt>Categoría</dt><dd>{{ categoria.nombre }}</dd></div>
          <div><dt>Tipo</dt><dd>{{ producto.tipo }}</dd></div>
          <div><dt>Género</dt><dd>{{ producto.genero }}</dd></div>
          <div>
            <dt>Color</dt>
            <dd><span class="muestra" :style="{ background: producto.colorHex }" /> {{ producto.color }}</dd>
          </div>
          <div><dt>Material</dt><dd>{{ producto.material }}</dd></div>
          <div><dt>Código</dt><dd>{{ producto.id }}</dd></div>
        </dl>

        <fieldset class="tallas">
          <legend>Talla (EU)</legend>
          <label v-for="t in producto.tallas" :key="t" class="talla" :class="{ 'talla--activa': talla === t }">
            <input v-model="talla" type="radio" name="talla" :value="t" class="sr-only" />
            {{ t }}
          </label>
        </fieldset>

        <BotonComprar :producto="producto" :talla="talla" />
      </div>
    </article>

    <Comentarios :termino="`producto-${producto.slug}`" />

    <section v-if="relacionados.length" aria-labelledby="titulo-relacionados">
      <h2 id="titulo-relacionados" class="seccion__titulo">Más en {{ categoria.nombre }}</h2>
      <div class="rejilla">
        <TarjetaProducto v-for="p in relacionados" :key="p.id" :producto="p" />
      </div>
    </section>
  </div>
</template>
