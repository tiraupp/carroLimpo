import * as z from "zod";

export const schema = z.object({
  marca: z.string().nonempty("Marca é obrigatório"),
  modelo: z.string().nonempty("Modelo é obrigatório"),
  placa: z.string().nonempty("Placa é obrigatório"),
  ano: z.string().optional(),
  categoria_id: z.string(),
});
