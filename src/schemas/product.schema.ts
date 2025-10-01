import { z } from "zod";

export const productSchema = z.object({
  nombre: z
    .string({
      error: "El nombre es obligatorio",
    })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  precio: z
    .number({
      error: "El precio es obligatorio",
    })
    .min(0, { message: "El precio debe ser mayor o igual a 0" }),
});

export type ProductInput = z.infer<typeof productSchema>;
