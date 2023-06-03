import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { LoginCommand } from 'src/usuario/dominio/command/login.command';
import { UsuarioService } from '../services/usuario.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  login(@Body() loginCommand: LoginCommand) {
    return this.usuarioService.login(loginCommand);
  }
}
