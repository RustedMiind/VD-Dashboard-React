import { z } from "zod";
import { mediaSchema } from "../Media";

export const mobileServiceSchema = z.object({
  id: z.number(),
  name: z.string(),
  mobile_service_id: z.string().or(z.null()).optional(),
  description: z.string().or(z.null()).optional(),
  specifications: z.string().or(z.null()).optional(),
  features: z.string().or(z.null()).optional(),
  created_at: z.string(),
  updated_at: z.string(),
  pictures: z
    .object({
      banners: z.array(mediaSchema).or(z.null()).optional(),
      image: z.array(mediaSchema).or(z.null()).optional(),
    })
    .nullable(),
  media: z.array(mediaSchema).optional(),
  child: z.unknown(),
  is_responsible_service: z.literal(0).or(z.literal(1)).nullable(),
});

export type MobileService = z.infer<typeof mobileServiceSchema>;
