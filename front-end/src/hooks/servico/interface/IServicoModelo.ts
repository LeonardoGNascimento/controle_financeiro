import { IServico } from "./IServico";

export interface IServicoModelo {
  id: number;
  dataHora: Date;
  nome: string;

  servico?: IServico[];
}
