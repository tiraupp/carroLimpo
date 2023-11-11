import * as z from "zod";

const celularRegex = /^\d{10,}$/i;
const cpfRegex = /[0-9]{11}/;

export const schemaCPF = z
  .object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    celular: z.string().refine((value) => celularRegex.test(value), {
      message:
        "Telefone inválido. Por favor, insira um número de telefone válido",
    }),

    cpf: z.string().refine((value) => cpfRegex.test(value), {
      message: "Formato de CPF inválido",
    }),
    senha: z
      .string()
      .nonempty("Senha é obrigatória")
      .min(8, "A senha deve ter no mínimo 8 caracteres"),
    confirmarSenha: z.string().nonempty("Obrigatório confirmar senha"),
  })
  .refine(({ senha, confirmarSenha }) => confirmarSenha === senha, {
    message: "As senhas não conferem",
    path: ["confirmarSenha"],
  });
