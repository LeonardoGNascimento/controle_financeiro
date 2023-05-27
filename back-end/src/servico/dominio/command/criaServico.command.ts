import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CriaServicoCommand {
  @ApiProperty()
  @IsNotEmpty({ message: 'clienteNome é obrigatório' })
  clienteNome: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'clienteNumero é obrigatório' })
  clienteNumero: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'placa é obrigatório' })
  placa: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'servicoModeloId é obrigatório' })
  servicoModeloId: number;
}
