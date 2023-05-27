import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CriaServicoModeloCommand {
  @ApiProperty()
  @IsNotEmpty({ message: 'Nome do serviço é obrigatório' })
  nome: string;
}
