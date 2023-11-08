import * as z from "zod";

export const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cover: z.string().url("Deve ser uma url"),
  published: z.string().nonempty("Data de publicação é obrigatória"),
  publishingCompany: z.string().nonempty("Editora é obrigatória"),
  author: z.string().optional(),
  numberPages: z.coerce.number().min(1, "Deve ser maior ou igual a 1"),
});
