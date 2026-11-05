
const API_URL = import.meta.env.WP_API_URL;

export interface Cafe {
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
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
      alt_text: string;
    }[];
  };
}

export interface Entrada {
  id: number;
  slug: string;
  titulo: string;
  fecha: string;
  descripcion: string;
  imagen: string;
  textoAlternativo: string;
}

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

export async function getCafes(): Promise<Cafe[]> {
  const respuesta = await fetch(`${API_URL}/wp/v2/cafe?_embed`);

  if (!respuesta.ok) {
    throw new Error('Error al obtener los cafés de WordPress');
  }

  return respuesta.json();
}

export async function getCafe(slug: string): Promise<Cafe | undefined> {
  const cafes = await getCafes();
  return cafes.find((cafe) => cafe.slug === slug);
}

export async function getEntradas(): Promise<Entrada[]> {
  const respuesta = await fetch(`${API_URL}/wp/v2/posts?_embed`);

  if (!respuesta.ok) {
    throw new Error('Error al obtener las entradas de WordPress');
  }

  const entradas: EntradaWordPress[] = await respuesta.json();

  return entradas.map((entrada) => {
    const imagen = entrada._embedded?.['wp:featuredmedia']?.[0];

    return {
      id: entrada.id,
      slug: entrada.slug,
      titulo: entrada.title.rendered,
      fecha: entrada.date,
      descripcion: entrada.excerpt.rendered.replace(/<[^>]*>/g, '').trim(),
      imagen: imagen?.source_url || '',
      textoAlternativo: imagen?.alt_text || ''
    };
  });
}

export async function getEntrada(slug: string): Promise<EntradaWordPress | undefined> {
  const respuesta = await fetch(
    `${API_URL}/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`
  );

  if (!respuesta.ok) {
    throw new Error('Error al obtener el artículo de WordPress');
  }

  const entradas: EntradaWordPress[] = await respuesta.json();
  return entradas[0];
}
