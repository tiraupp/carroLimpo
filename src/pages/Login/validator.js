import * as z from "zod";

export const schema = z.object({
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  senha: z.string().nonempty("Senha é obrigatória"),
});
