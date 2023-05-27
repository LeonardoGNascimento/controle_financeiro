import * as yup from "yup";

export interface ILogin {
  email: string;
  senha: string;
}

export const schema = yup
  .object({
    email: yup.string().required("Email é obrigatório"),
    senha: yup.string().required("Senha é obrigatório"),
  })
  .required();
