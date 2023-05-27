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
@Controller('usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @UseGuards(JwtGuard)
  @Post()
  async cria(
    @Body() cadastrarUsuarioCommand: CadastrarUsuarioCommand,
  ): Promise<Usuario> {
    return await this.usuarioService.cria(cadastrarUsuarioCommand);
  }

  @Post('/login')
  async login(@Body() loginCommand: LoginCommand) {
    return await this.usuarioService.login(loginCommand);
  }

  @Get()
  async listar(): Promise<Usuario[]> {
    return await this.usuarioService.listar();
  }

  @Get('/:id')
  async buscar(@Param('id') id: number): Promise<Usuario> {
    return await this.usuarioService.buscar(id);
  }

  @Delete('/:id')
  async excluir(@Param('id') id: number): Promise<any> {
    return await this.usuarioService.excluir(id);
  }
}
