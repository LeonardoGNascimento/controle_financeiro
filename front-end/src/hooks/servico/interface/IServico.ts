import { IUsuario } from "../../usuario/interface/IUsuario";
import { IServicoModelo } from "./IServicoModelo";

export interface IServico {
  id: number;
  dataHora: Date;
  clienteNome: string;
  clienteNumero: string;
  placa: string;
  veiculoModelo: string;
  finalizado?: Date;
  excluido: number;
  usuario: IUsuario;
  servicoModeloId: number;
  servicoModelo?: IServicoModelo;
}
