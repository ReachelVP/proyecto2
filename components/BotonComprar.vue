<script setup lang="ts">
import type { Producto } from '~/composables/useCatalogo'

// Botón de compra de Snipcart. Los atributos data-item-* describen el producto;
// data-item-url apunta a la página del producto, donde Snipcart valida el precio.
const props = defineProps<{ producto: Producto; talla?: number | null; compacto?: boolean }>()

const tallaElegida = computed(() => String(props.talla ?? props.producto.tallas[0]))
</script>

<template>
  <button
    type="button"
    class="btn btn--primario snipcart-add-item"
    :class="{ 'btn--compacto': compacto }"
    :data-item-id="producto.id"
    :data-item-name="producto.nombre"
    :data-item-price="producto.precio.toFixed(2)"
    :data-item-url="`/producto/${producto.slug}`"
    :data-item-description="producto.descripcion"
    :data-item-image="producto.imagen"
    data-item-custom1-name="Talla"
    :data-item-custom1-options="producto.tallas.join('|')"
    :data-item-custom1-value="tallaElegida"
  >
    {{ compacto ? 'Agregar' : 'Agregar al carrito' }}
  </button>
</template>
