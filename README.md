# Tueste Norte ☕

Web pública de Tueste Norte, un tostadero de café de especialidad. Desarrollada con **Astro y Tailwind CSS**, con páginas estáticas para ofrecer una navegación rápida y una experiencia adaptable a móviles, tabletas y ordenadores.

## Características

- Portada de Tueste Norte.
- Página «Quiénes somos» con la historia y los valores del tostadero.
- Catálogo de cafés de especialidad de Etiopía, Colombia, Brasil y Guatemala.
- Página de contacto con la información de la tienda.
- Blog con artículos en Markdown sobre recetas y métodos de preparación.
- Colecciones de contenido para el blog y los avisos.
- Componentes reutilizables: `Header`, `Footer`, `CafeCard` y `BaseLayout`.
- Diseño responsive con Tailwind CSS.

## Tecnologías

- [Astro](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- Colecciones de contenido de Astro con esquemas de validación.

## Requisitos

Tener Node.js y npm instalados.

## Instalación y ejecución

Clona el repositorio y entra en la carpeta del proyecto. Después, ejecuta:

```bash
npm install
npm run dev
```

Abre la dirección local que indique Astro en la terminal, normalmente `http://localhost:4321`.

## Compilación y vista previa

Para generar la web estática de producción:

```bash
npm run build
```

Para comprobar localmente la versión generada:

```bash
npm run preview
```

## Organización del contenido

Los artículos del blog y los avisos se guardan en archivos Markdown dentro de `src/content/blog/` y `src/content/avisos/`. Astro valida sus datos mediante los esquemas definidos en `src/content.config.ts`.

Los datos del catálogo de cafés se mantienen localmente en el proyecto, sin conexión a la API de WordPress, tal como requiere esta fase del encargo.

## Generación estática

Astro genera las páginas HTML durante la compilación. Esto reduce el trabajo que debe realizar el servidor al recibir visitas y favorece una carga rápida, algo importante ante el aumento de tráfico previsto por el reportaje gastronómico.

## Estado del proyecto

Esta entrega corresponde a la versión estática de la web pública. La integración con WordPress queda fuera del alcance de esta fase.
