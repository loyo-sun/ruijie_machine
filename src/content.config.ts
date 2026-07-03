import { defineCollection, z } from "astro:content";

const resources = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional()
  })
});

export const collections = {
  resources
};
