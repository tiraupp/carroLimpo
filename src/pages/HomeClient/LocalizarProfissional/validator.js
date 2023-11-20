import * as z from "zod";

export const schema = z.object({
  localizarProfissional: z.string().optional(),
  cidade: z.string().optional(),
});
