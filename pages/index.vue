<script setup lang="ts">
const { categorias, productosDeCategoria, destacados, tienda } = useCatalogo()
useHead({ title: `${tienda.nombre} · Tienda de zapatos` })
</script>

<template>
  <div>
    <section class="hero">
      <div>
        <p class="hero__etiqueta">Tienda de zapatos en línea</p>
        <h1>{{ tienda.lema }}</h1>
        <p>Deportivos, casuales, formales, botas, sandalias y calzado infantil. Elija una categoría o busque su próximo par.</p>
        <div class="hero__acciones">
          <NuxtLink to="/productos" class="btn btn--primario">Ver todo el catálogo</NuxtLink>
          <NuxtLink to="/buscar" class="btn">Buscar</NuxtLink>
        </div>
      </div>
      <img src="/img/productos/veloz-runner-3.svg" alt="" width="400" height="300" />
    </section>

    <section aria-labelledby="titulo-categorias">
      <h2 id="titulo-categorias" class="seccion__titulo">Categorías</h2>
      <ul class="rejilla rejilla--categorias">
        <li v-for="c in categorias" :key="c.slug">
          <NuxtLink :to="`/categoria/${c.slug}`" class="categoria">
            <img :src="c.imagen" :alt="''" width="400" height="300" loading="lazy" />
            <div class="categoria__cuerpo">
              <h3>{{ c.nombre }}</h3>
              <p>{{ c.descripcion }}</p>
              <span class="categoria__conteo">{{ productosDeCategoria(c.slug).length }} productos →</span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section aria-labelledby="titulo-destacados">
      <h2 id="titulo-destacados" class="seccion__titulo">Destacados</h2>
      <div class="rejilla">
        <TarjetaProducto v-for="p in destacados()" :key="p.id" :producto="p" />
      </div>
    </section>
  </div>
</template>
