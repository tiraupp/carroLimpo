import * as z from "zod";

export const schema = z.object({
  nome: z.string().min(3, "Nome inválido").nonempty("Nome é obrigatório"),
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  celular: z.string(),
  cpf: z.string(),
  data_nascimento: z.string(),
});
