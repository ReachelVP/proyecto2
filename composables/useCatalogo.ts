import productosData from '~/data/productos.json'
import categoriasData from '~/data/categorias.json'
import tiendaData from '~/data/tienda.json'

export interface Producto {
  id: string
  slug: string
  nombre: string
  descripcion: string
  categoria: string
  imagen: string
  precio: number
  marca: string
  tipo: string
  genero: string
  color: string
  colorHex: string
  material: string
  tallas: number[]
  destacado: boolean
}

export interface Categoria {
  slug: string
  nombre: string
  descripcion: string
  imagen: string
}

export interface Pagina<T> {
  items: T[]
  pagina: number
  totalPaginas: number
  total: number
}

const productos = productosData as Producto[]
const categorias = categoriasData as Categoria[]
const tienda = tiendaData

/** Quita tildes y pasa a minúsculas para comparar textos */
export const normalizar = (texto: string) =>
  texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export const formatoPrecio = (precio: number) =>
  new Intl.NumberFormat('es-CR', { style: 'currency', currency: tienda.moneda }).format(precio)

export function useCatalogo() {
  const categoriaPorSlug = (slug: string) => categorias.find((c) => c.slug === slug)
  const productoPorSlug = (slug: string) => productos.find((p) => p.slug === slug)
  const productosDeCategoria = (slug: string) => productos.filter((p) => p.categoria === slug)
  const destacados = () => productos.filter((p) => p.destacado)

  function paginar<T>(lista: T[], pagina: number, porPagina = tienda.productosPorPagina): Pagina<T> {
    const totalPaginas = Math.max(1, Math.ceil(lista.length / porPagina))
    const inicio = (pagina - 1) * porPagina
    return { items: lista.slice(inicio, inicio + porPagina), pagina, totalPaginas, total: lista.length }
  }

  /** Busca por palabras clave en nombre, descripción, marca, tipo, color, material, género y categoría */
  function buscar(consulta: string) {
    const palabras = normalizar(consulta).split(/\s+/).filter(Boolean)
    if (!palabras.length) return { productos: [] as Producto[], categorias: [] as Categoria[] }

    const coincide = (texto: string) => palabras.every((p) => texto.includes(p))

    return {
      productos: productos.filter((p) => {
        const cat = categoriaPorSlug(p.categoria)?.nombre ?? ''
        return coincide(
          normalizar([p.nombre, p.descripcion, p.marca, p.tipo, p.color, p.material, p.genero, cat].join(' '))
        )
      }),
      categorias: categorias.filter((c) => coincide(normalizar(`${c.nombre} ${c.descripcion}`)))
    }
  }

  return {
    tienda,
    productos,
    categorias,
    categoriaPorSlug,
    productoPorSlug,
    productosDeCategoria,
    destacados,
    paginar,
    buscar
  }
}
