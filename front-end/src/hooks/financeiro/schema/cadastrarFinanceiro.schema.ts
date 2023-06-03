import * as yup from "yup";

export const cadastrarFinanceiroSchema = yup
  .object({
    valor: yup.string().required("Valor é obrigatório"),
    financeiroDescricaoId: yup.string().required("Descrição é obrigatório"),
  })
  .required();
