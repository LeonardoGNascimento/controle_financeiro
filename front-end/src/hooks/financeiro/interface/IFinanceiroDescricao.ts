import { IFinanceiro } from "./IFinanceiro";

export interface IFinanceiroDescricao {
  id: number;
  dataHora: Date;
  descricao: string;

  financeiro?: IFinanceiro[];
}
