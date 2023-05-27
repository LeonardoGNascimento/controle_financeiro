import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CadastrarUsuarioCommand {
  @ApiProperty()
  @IsNotEmpty({ message: 'Nome é obrigátorio' })
  nome: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email é obrigátorio' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Senha é obrigátorio' })
  senha: string;
}
