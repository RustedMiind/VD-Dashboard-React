import { z } from "zod";

export const mediaSchema = z.object({
  id: z.number(),
  model_type: z.string(),
  model_id: z.number(),
  uuid: z.string(),
  collection_name: z.string().nullable(),
  name: z.string().nullable(),
  file_name: z.string().nullable(),
  mime_type: z.string().nullable(),
  disk: z.string().nullable(),
  conversions_disk: z.string().nullable(),
  size: z.number(),
  order_column: z.number().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  original_url: z.string(),
  preview_url: z.string().nullable(),
});

export type Media = z.infer<typeof mediaSchema>;
