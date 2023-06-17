import { object, string } from "yup";

export const schema = object({
  descricao: string().required("Descrição é obrigatório"),
}).required();
