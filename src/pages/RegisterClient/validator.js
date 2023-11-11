import * as z from "zod";

export const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "Email é obrigatório"),
  senha: z.string().min(1, "Senha é obrigatória."),
});
