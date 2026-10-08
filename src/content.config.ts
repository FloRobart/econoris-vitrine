import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    /** Titre court pour les listes et le fil d'Ariane. */
    shortTitle: z.string(),
    description: z.string().max(170),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** Ordre d'affichage dans la liste des guides. */
    order: z.number().default(100),
  }),
});

export const collections = { guides };
