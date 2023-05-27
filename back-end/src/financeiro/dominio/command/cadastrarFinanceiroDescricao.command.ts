import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CadastrarFinanceiroDescricaoCommand {
  @ApiProperty()
  @IsNotEmpty({ message: 'descricao é obrigatório' })
  descricao: string;
}
