import * as z from "zod";

export const schema = z.object({
  logradouro: z.string().min(3, "Nome inválido").nonempty("Nome da rua é obrigatório"),
  numero: z.string(),
  bairro: z.string(),
  complemento: z.string(),
  cep: z.string().min(8, "Cep inválido").nonempty("Número do cep é obrigatório"),
  cidade: z.string().nonempty("Nome da cidade é obrigatório"),
  estado: z.string().nonempty("Sigla do estado é obrigatório").max(2, "Sigla no formato XX"),
});
