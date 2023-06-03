import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Usuario } from 'src/usuario/dominio/entity/usuario.entity';

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

  @ApiProperty()
  @IsNotEmpty({ message: 'veiculoModelo é obrigatório' })
  veiculoModelo: string;

  usuario: Usuario;
}
