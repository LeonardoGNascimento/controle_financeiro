import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CadastrarFinanceiroCommand {
  @ApiProperty()
  @IsNotEmpty({ message: 'valor é obrigatório' })
  @IsNumber({}, { message: 'valor deve ser um numero' })
  valor: number;

  @IsNotEmpty({ message: 'financeiroDescricaoId é obrigatório' })
  @IsNumber({}, { message: 'financeiroDescricaoId deve inteiro' })
  financeiroDescricaoId: number;

  servicoId: number;
  usuarioId: number;
}
