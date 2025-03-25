import { glob } from 'astro/loaders';
import { z, defineCollection } from 'astro:content';

const song = defineCollection({
    loader: glob({ base: './src/content/song', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
        title: z.string().max(50, {message:"Allowed only 50 character in the title."}),
        author: z.string(),
        category: z.enum(["JPop", "Rock", "Alternative", "Ballad"]),
        img: z.string().optional(),
        ytlink: z.string(),
        lyrics: z.string(),
    })
});

export const collections = {
    song
};