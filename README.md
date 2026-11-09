# Paso Firme · Tienda de zapatos

Proyecto 2 de Arquitectura de la Información: aplicación de comercio electrónico hecha con **Nuxt 3**,
**Snipcart** (carrito de compras) y **utterances** (comentarios). Tema: **Tienda de zapatos (116970350)**.

## Enlaces

- **Sitio publicado (Netlify):** <https://startling-lollipop-06f382.netlify.app>
- **Repositorio (código y comentarios de utterances):** <https://github.com/ReachelVP/proyecto2>

## Funcionalidades

| Requisito | Dónde está |
|---|---|
| Catálogo de 36 artículos en JSON | `data/productos.json` |
| Lista de categorías | `data/categorias.json` (Deportivos, Casuales, Formales, Botas, Sandalias, Infantiles) |
| Organización por categorías | Portada `/` → `/categoria/<slug>` → `/producto/<slug>` |
| Búsqueda por palabras clave | Campo en el encabezado y página `/buscar?q=...` (busca en nombre, descripción, marca, tipo, color, material, género y categoría; ignora tildes) |
| Paginación | `/categoria/<slug>/2`, `/productos/2`… (4 productos por página, se cambia en `data/tienda.json`) |
| Botón de compra (Snipcart) | En cada tarjeta y en el detalle del producto, con selección de talla |
| Carrito en el menú principal | Botón «Carrito» del encabezado y enlace en el menú |
| Comentarios (utterances) | Al final de cada página de producto |

Cada producto guarda información genérica (nombre, descripción, categoría, imagen) y específica
(precio, marca, tipo, género, color, material, tallas disponibles).

## Estructura

```
data/            JSON del catálogo (productos, categorías, configuración de la tienda)
pages/           Rutas: inicio, categoría paginada, catálogo paginado, producto, búsqueda
components/      Tarjeta de producto, paginación, botón de compra, formulario de búsqueda, comentarios
composables/     useCatalogo: acceso a los JSON, paginación y búsqueda
plugins/         Carga de Snipcart
layouts/         Encabezado con menú, buscador y carrito; pie de página
scripts/         Generador de las ilustraciones SVG de los productos
public/img/      Imágenes de los productos
```

## Configuración

1. Instalar dependencias: `npm install`
2. Copiar `.env.example` como `.env` y completar:
   - `NUXT_PUBLIC_SNIPCART_KEY`: cree una cuenta en <https://snipcart.com>, vaya a
     *Account → API Keys* y copie la **llave pública de prueba** (Test).
   - `NUXT_PUBLIC_UTTERANCES_REPO`: cree un repositorio **público** en GitHub (p. ej. `usuario/paso-firme-comentarios`),
     instale la app <https://github.com/apps/utterances> en ese repositorio y escriba `usuario/repositorio`.
3. Desarrollo: `npm run dev` → <http://localhost:3000>
4. Generar sitio estático: `npm run generate` (queda en `.output/public`)

## Publicación en Netlify

1. Suba el código a un repositorio de GitHub (sin `node_modules`, `.nuxt`, `.output`).
2. En Netlify: *Add new site → Import an existing project* y elija el repositorio.
   El archivo `netlify.toml` ya define el comando `npm run generate` y la carpeta `dist`.
3. En *Site configuration → Environment variables* agregue `NUXT_PUBLIC_SNIPCART_KEY` y `NUXT_PUBLIC_UTTERANCES_REPO`.
4. Despliegue el sitio y copie la URL (p. ej. `https://paso-firme.netlify.app`).
5. En Snipcart, *Account → Domains & URLs*, agregue ese dominio. Snipcart visita la página de cada producto
   para validar el precio, así que el pedido de prueba solo funciona en el sitio publicado.

Tarjeta de prueba de Snipcart: `4242 4242 4242 4242`, cualquier fecha futura, CVV `123`.

## Entrega en el Aula Virtual

Comprima la carpeta **sin** `node_modules`, `.nuxt`, `.output` ni `dist`.

## Imágenes

Las imágenes son ilustraciones SVG generadas con `npm run imagenes` a partir del color de cada producto.
Para usar fotografías reales, colóquelas en `public/img/productos/` y actualice el campo `imagen` en `data/productos.json`.
