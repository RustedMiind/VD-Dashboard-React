import { z } from "zod";
import { mediaSchema } from "../Media";

const baseMobileServiceSchema = z.object({
  id: z.number(),
  name: z.string(),
  mobile_service_id: z
    .string()
    .nullable()
    .optional()
    .transform((value) => {
      if (value) {
        const numValue = parseInt(value);
        if (numValue) return numValue;
      }
    }),
  description: z.string().nullable().optional(),
  specifications: z.string().nullable().optional(),
  features: z.string().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
  pictures: z
    .object({
      banners: z.array(mediaSchema).nullable().optional(),
      image: z.array(mediaSchema).nullable().optional(),
    })
    .nullable()
    .optional(),
  media: z.array(mediaSchema).optional(),
  child: z.unknown(),
  is_responsible_service: z.literal(0).or(z.literal(1)).nullable(),
});

export const mobileServiceSchema :z.ZodType<MobileService> = baseMobileServiceSchema.extend({
    children: z.lazy(() => mobileServiceSchema.array().optional()),
}) as z.ZodType<MobileService>;

export type MobileService = z.infer<typeof baseMobileServiceSchema> & {children?:MobileService[]};
