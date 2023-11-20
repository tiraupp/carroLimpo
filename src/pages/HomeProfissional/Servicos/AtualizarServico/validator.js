import * as z from "zod";

export const schema = z.object({
  nome: z.string().nonempty("Nome do serviço é obrigatório"),
  descricao: z.string().nonempty("Descrição do serviço é obrigatório"),
  valor: z.string().nonempty("Valor do serviço é obrigatório"),
  categoria_id: z.string().optional(),
});
