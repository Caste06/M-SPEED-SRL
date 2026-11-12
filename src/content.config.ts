import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articoli = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articoli' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    category: z.string().optional().default('Logistica'),
    author: z.string().optional().default('M-SPEED SRL'),
  }),
});

export const collections = {
  articoli,
};
