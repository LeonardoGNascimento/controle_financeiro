import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/core/auth/jwt.auth.guard';
import { CadastrarUsuarioCommand } from 'src/usuario/dominio/command/cadastrarUsuario.command';
import { Usuario } from 'src/usuario/dominio/entity/usuario.entity';
import { UsuarioService } from '../services/usuario.service';

@ApiTags('usuario')
@Controller('usuario')
@UseGuards(JwtGuard)
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  cria(
    @Body() cadastrarUsuarioCommand: CadastrarUsuarioCommand,
  ): Promise<Usuario> {
    return this.usuarioService.cria(cadastrarUsuarioCommand);
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
