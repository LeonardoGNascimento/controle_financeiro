import * as yup from "yup";

export interface ICadastroUsuario {
  nome: string;
  email: string;
  senha: string;
}

export const schema = yup
  .object({
    nome: yup.string().required("Nome é obrigatório"),
    email: yup.string().required("Email é obrigatório"),
    senha: yup.string().required("Senha é obrigatório"),
  })
  .required();
