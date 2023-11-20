import * as z from "zod";

export const schema = z.object({
  calendario: z.date().optional(),
  servico: z.string().optional(),
  veiculo: z.string().optional(),
  profissional: z.string().optional(),
});
