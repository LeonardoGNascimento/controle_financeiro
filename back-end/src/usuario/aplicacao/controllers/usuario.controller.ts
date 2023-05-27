import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common/decorators';
import { JwtGuard } from 'src/core/auth/jwt.auth.guard';
import { LoginCommand } from 'src/usuario/dominio/command/login.command';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from 'src/usuario/dominio/entity/usuario.entity';
import { CadastrarUsuarioCommand } from 'src/usuario/dominio/command/cadastrarUsuario.command';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @UseGuards(JwtGuard)
  @Post()
  cria(
    @Body() cadastrarUsuarioCommand: CadastrarUsuarioCommand,
  ): Promise<Usuario> {
    return this.usuarioService.cria(cadastrarUsuarioCommand);
  }

  @Post('/login')
  login(@Body() loginCommand: LoginCommand) {
    return this.usuarioService.login(loginCommand);
  }

  @Get()
  listar(): Promise<Usuario[]> {
    return this.usuarioService.listar();
  }

  @Get('/:id')
  buscar(@Param('id') id: number): Promise<Usuario> {
    return this.usuarioService.buscar(id);
  }

  @Delete('/:id')
  excluir(@Param('id') id: number): Promise<any> {
    return this.usuarioService.excluir(id);
  }
}
