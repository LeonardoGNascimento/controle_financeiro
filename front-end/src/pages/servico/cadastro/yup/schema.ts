import * as yup from "yup";

export interface ICadastroServico {
  clienteNome: string;
  clienteNumero: string;
  imei?: string;
  modelo?: string;
  servicoModeloId: number;
  orcamento: number;
}

export interface ICadastroServicoModelo {
  nome: string;
}

export const schema = yup
  .object({
    clienteNome: yup.string().required("Cliente nome é obrigatório"),
    clienteNumero: yup.string().required("Cliente número é obrigatório"),
    servicoModeloId: yup.string().required("Serviço é obrigatório"),
    orcamento: yup.string().required("Orçamento é obrigatório"),
  })
  .required();

export const schemaModelo = yup
  .object({
    nome: yup.string().required("Nome é obrigatório"),
  })
  .required();
