
const API_URL = import.meta.env.WP_API_URL;

// Tipos de los datos que utilizará nuestra web
export interface Cafe {
  id: number;
  slug: string;
  titulo: string;
  contenido: string;
  fecha: string;
  origen: string;
  notasDeCata: string;
  nivelDeTueste: string;
  precio: number;
  imagen: string;
  textoAlternativo: string;
}

export interface Entrada {
  id: number;
  slug: string;
  titulo: string;
  fecha: string;
  descripcion: string;
  contenido: string;
  imagen: string;
  textoAlternativo: string;
}

// Estructura original que devuelve WordPress para los cafés
interface CafeWordPress {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  acf: {
    origen: string;
    notas_de_cata: string;
    nivel_de_tueste: string;
    precio: number;
  };
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
      alt_text: string;
    }[];
  };
}

// Estructura original que devuelve WordPress para las entradas
interface EntradaWordPress {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  excerpt: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
      alt_text: string;
    }[];
  };
}

// Transforma los datos originales de WordPress en datos sencillos
function transformarCafe(cafe: CafeWordPress): Cafe {
  const imagen = cafe._embedded?.['wp:featuredmedia']?.[0];

  return {
    id: cafe.id,
    slug: cafe.slug,
    titulo: cafe.title.rendered,
    contenido: cafe.content.rendered,
    fecha: cafe.date,
    origen: cafe.acf.origen,
    notasDeCata: cafe.acf.notas_de_cata,
    nivelDeTueste: cafe.acf.nivel_de_tueste,
    precio: Number(cafe.acf.precio),
    imagen: imagen?.source_url || '',
    textoAlternativo: imagen?.alt_text || ''
  };
}

function transformarEntrada(entrada: EntradaWordPress): Entrada {
  const imagen = entrada._embedded?.['wp:featuredmedia']?.[0];

  return {
    id: entrada.id,
    slug: entrada.slug,
    titulo: entrada.title.rendered,
    fecha: entrada.date,
    descripcion: entrada.excerpt.rendered.replace(/<[^>]*>/g, '').trim(),
    contenido: entrada.content.rendered,
    imagen: imagen?.source_url || '',
    textoAlternativo: imagen?.alt_text || ''
  };
}

// Obtener todos los cafés
export async function getCafes(): Promise<Cafe[]> {
  const respuesta = await fetch(`${API_URL}/wp/v2/cafe?_embed`);

  if (!respuesta.ok) {
    throw new Error('Error al obtener los cafés de WordPress');
  }

  const cafes: CafeWordPress[] = await respuesta.json();

  return cafes.map(transformarCafe);
}

// Obtener un café por su slug
export async function getCafe(slug: string): Promise<Cafe | undefined> {
  const cafes = await getCafes();
  return cafes.find((cafe) => cafe.slug === slug);
}

// Obtener todas las entradas del blog
export async function getEntradas(): Promise<Entrada[]> {
  const respuesta = await fetch(`${API_URL}/wp/v2/posts?_embed`);

  if (!respuesta.ok) {
    throw new Error('Error al obtener las entradas de WordPress');
  }

  const entradas: EntradaWordPress[] = await respuesta.json();

  return entradas.map(transformarEntrada);
}

// Obtener una entrada por su slug
export async function getEntrada(slug: string): Promise<Entrada | undefined> {
  const respuesta = await fetch(
    `${API_URL}/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`
  );

  if (!respuesta.ok) {
    throw new Error('Error al obtener el artículo de WordPress');
  }

  const entradas: EntradaWordPress[] = await respuesta.json();

  return entradas.length > 0
    ? transformarEntrada(entradas[0])
    : undefined;
}
