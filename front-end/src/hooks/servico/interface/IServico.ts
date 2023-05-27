import { IServicoModelo } from "./IServicoModelo";

export interface IServico {
  id: number;
  dataHora: Date;
  clienteNome: string;
  clienteNumero: string;
  imei: string;
  modelo?: string;
  servicoModeloId: number;
  orcamento: number;
  finalizado?: Date;
  tipoPagamento?: string;

  servicoModelo?: IServicoModelo;
}
