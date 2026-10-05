import z from "zod";

export const createSpotSchema = z.strictObject({
  title: z.string().trim().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  observation: z.string().nullable().optional(),
});

export const updateSpotSchema = createSpotSchema
  .partial()
  .refine((body) => Object.values(body).some((value) => value !== undefined), {
    message: "Provide at least one field to update",
  });

export const spotIdParam = z.coerce.number().positive().int();
export const spotParamsSchema = z.strictObject({
  id: spotIdParam,
});

export type SpotParams = z.infer<typeof spotParamsSchema>;
export type CreateSpotBody = z.infer<typeof createSpotSchema>;
export type UpdateSpotBody = z.infer<typeof updateSpotSchema>;
