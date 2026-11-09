<script setup lang="ts">
import type { NuxtError } from '#app'
const props = defineProps<{ error: NuxtError }>()
useHead({ title: `Error ${props.error.statusCode} · Paso Firme` })
</script>

<template>
  <NuxtLayout>
    <div class="vacio error">
      <h1>{{ error.statusCode === 404 ? 'No encontramos esa página' : 'Ocurrió un error' }}</h1>
      <p>{{ error.statusMessage || error.message }}</p>
      <button class="btn btn--primario" type="button" @click="clearError({ redirect: '/' })">Volver al inicio</button>
    </div>
  </NuxtLayout>
</template>
