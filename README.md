
# Tueste Norte ☕

Web pública de Tueste Norte, un tostadero de café de especialidad. Desarrollada con **Astro, Tailwind CSS y WordPress**, utilizando la API REST de WordPress para gestionar los cafés y los artículos del blog.

## Características

- Portada de Tueste Norte.
- Página «Quiénes somos».
- Catálogo dinámico de cafés de especialidad: Etiopía, Colombia, Brasil y Guatemala.
- Fichas individuales de cada café.
- Página de contacto.
- Blog conectado a WordPress con listado y páginas individuales de artículos.
- Avisos gestionados mediante colecciones de contenido de Astro.
- Ejercicios de conexión con la API REST y renderizado del reloj.
- Componentes reutilizables: `Header`, `Footer`, `CafeCard` y `BaseLayout`.
- Diseño responsive para móviles, tabletas y ordenadores.

## Tecnologías

- [Astro](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- WordPress.
- API REST de WordPress.
- TypeScript.
- Node.js.

## Requisitos

- Node.js instalado.
- npm instalado.
- XAMPP con Apache y MySQL.
- WordPress instalado y funcionando.

## Instalación y ejecución

Clonar el repositorio y entrar en la carpeta del proyecto.

Instalar las dependencias:

```bash
npm install
```

Crear el archivo `.env` a partir de `.env.example` y configurar la dirección de la API REST de WordPress:

```env
WP_API_URL=http://localhost/tueste-norte-wp/wp-json
```

Iniciar Apache y MySQL desde XAMPP y comprobar que WordPress está funcionando.

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abrir la dirección local indicada por Astro, normalmente `http://localhost:4321`.

## Compilación y ejecución en producción

Con WordPress funcionando, generar la versión de producción:

```bash
npm run build
```

Iniciar el servidor Node:

```bash
node ./dist/server/entry.mjs
```

## Organización del proyecto

- `src/components/`: componentes reutilizables.
- `src/layouts/`: estructura general de las páginas.
- `src/pages/`: páginas y rutas dinámicas.
- `src/pages/ejercicios/`: ejercicios de la actividad.
- `src/lib/wp.ts`: conexión con WordPress y funciones para obtener cafés y artículos.
- `src/content/avisos/`: avisos en formato Markdown.
- `public/images/`: imágenes y recursos estáticos.
- `.env`: configuración local de la API de WordPress.
- `.env.example`: ejemplo de configuración.

Los cafés y artículos se obtienen desde WordPress mediante su API REST. Los avisos continúan gestionándose mediante colecciones de contenido de Astro.

## Decisión de renderizado

El proyecto utiliza renderizado en servidor (SSR) mediante Astro y el adaptador Node.
Los datos de cafés y artículos se obtienen desde la API REST de WordPress.
Las páginas solicitan los datos a WordPress durante cada petición.
Cuando se publica un nuevo café, estará disponible sin reconstruir Astro.
Lo mismo ocurre con los nuevos artículos del blog.
Esta estrategia permite mantener el contenido actualizado.
No es necesario generar de nuevo la web por cada cambio de contenido.
El proyecto necesita un servidor compatible con Node.js para funcionar.
El alojamiento puede tener un coste superior al de una web estática.
También requiere mantener disponible el servidor de WordPress.
Si WordPress deja de funcionar, las peticiones a su API pueden fallar.
Por tanto, la disponibilidad de la web depende también de WordPress.

## Estado del proyecto

La web pública está conectada con WordPress para gestionar dinámicamente el catálogo de cafés y el blog. Las páginas mantienen el diseño responsive y los componentes reutilizables desarrollados durante las fases anteriores.
