<script setup lang="ts">
const { categorias, tienda } = useCatalogo()
const menuAbierto = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => (menuAbierto.value = false))
</script>

<template>
  <div class="sitio">
    <header class="cabecera">
      <div class="contenedor cabecera__fila">
        <NuxtLink to="/" class="logo">
          <img src="/favicon.svg" alt="" width="32" height="32" />
          <span>{{ tienda.nombre }}</span>
        </NuxtLink>

        <FormularioBusqueda class="cabecera__buscar" />

        <button class="carrito snipcart-checkout" type="button" aria-label="Ver carrito de compras">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
          </svg>
          <span class="carrito__texto">Carrito</span>
          <span class="carrito__cantidad snipcart-items-count">0</span>
        </button>

        <button class="menu-boton" type="button" :aria-expanded="menuAbierto" aria-controls="menu-principal" @click="menuAbierto = !menuAbierto">
          Menú
        </button>
      </div>

      <nav id="menu-principal" class="menu" :class="{ 'menu--abierto': menuAbierto }" aria-label="Menú principal">
        <ul class="contenedor menu__lista">
          <li><NuxtLink to="/">Inicio</NuxtLink></li>
          <li><NuxtLink to="/productos">Todos</NuxtLink></li>
          <li v-for="c in categorias" :key="c.slug">
            <NuxtLink :to="`/categoria/${c.slug}`">{{ c.nombre }}</NuxtLink>
          </li>
          <li><NuxtLink to="/buscar">Buscar</NuxtLink></li>
          <li><a href="#" class="snipcart-checkout" @click.prevent>Carrito</a></li>
        </ul>
      </nav>
    </header>

    <main class="contenedor principal">
      <slot />
    </main>

    <footer class="pie">
      <div class="contenedor pie__fila">
        <p><strong>{{ tienda.nombre }}</strong> · {{ tienda.lema }}</p>
        <p>Proyecto 2 · Arquitectura de la Información · Hecho con Nuxt, Snipcart y utterances</p>
      </div>
    </footer>
  </div>
</template>
