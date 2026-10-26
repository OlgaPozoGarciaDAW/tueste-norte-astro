
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const avisos = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/avisos/',
  }),
  schema: z.object({
    titulo: z.string(),
    fecha: z.coerce.date(),
    importante: z.boolean().default(false)
  })
});

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog/',
  }),
  schema: z.object({
    titulo: z.string(),
    fecha: z.coerce.date(),
    descripcion: z.string(),
  })
});

export const collections = { avisos, blog };
