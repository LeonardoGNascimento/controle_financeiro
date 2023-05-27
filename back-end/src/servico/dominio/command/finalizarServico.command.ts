import { IsNotEmpty } from 'class-validator';

export class FinalizarServicoCommand {
  id: number;

  @IsNotEmpty({ message: 'Tipo pagamento é obrigatório' })
  tipoPagamento: string;

  constructor(id: number, tipoPagamento: string) {
    this.id = id;
    this.tipoPagamento = tipoPagamento;
  }
}
