import * as z from "zod";


export const schema = z
  .object({
    senhaAtual: z
    .string()
    .nonempty("Obrigatório informar senha atual"),
    novaSenha: z
      .string()
      .nonempty("Senha é obrigatória")
      .min(8, "A senha deve ter no mínimo 8 caracteres"),
    confirmarSenha: z.string().nonempty("Obrigatório confirmar senha"),
  })
  .refine(({ novaSenha, confirmarSenha }) => confirmarSenha === novaSenha, {
    message: "As senhas não conferem",
    path: ["confirmarSenha"],
  });