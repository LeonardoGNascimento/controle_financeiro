import { IServico } from "../../servico/interface/IServico";
import { IUsuario } from "../../usuario/interface/IUsuario";
import { IFinanceiroDescricao } from "./IFinanceiroDescricao";

export interface IFinanceiro {
  id: number;
  dataHora: Date;
  valor: number;
  excluido: number;
  usuarioId: number;
  servicoId: number;
  financeiroDescricaoId: number;
  usuario?: IUsuario;
  servico?: IServico;
  financeiroDescricao?: IFinanceiroDescricao;
}
