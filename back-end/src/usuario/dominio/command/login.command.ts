import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginCommand {
  @ApiProperty()
  @IsNotEmpty({ message: 'email é obrigátorio' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'senha é obrigátorio' })
  senha: string;
}
