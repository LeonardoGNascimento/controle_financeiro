import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CadastrarUsuarioCommand } from 'src/usuario/dominio/command/cadastrarUsuario.command';
import { LoginCommand } from 'src/usuario/dominio/command/login.command';
import { UsuarioRepository } from '../../infra/repository/mysql/usuario.repository';
import { Usuario } from 'src/usuario/dominio/entity/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private jwtService: JwtService,
  ) {}

  public async login(loginCommand: LoginCommand) {
    try {
      const resultado = await this.usuarioRepository.login(loginCommand);

      if (!resultado) {
        throw new NotFoundException('Usuario não encontrado');
      }

      const payload = {
        id: resultado.id,
        nome: resultado.nome,
        email: resultado.email,
      };

      return {
        ...payload,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  public async cria({
    email,
    nome,
    senha,
  }: CadastrarUsuarioCommand): Promise<Usuario> {
    try {
      const verificarEmail = await this.usuarioRepository.buscarPorEmail(email);

      if (verificarEmail) {
        throw new BadRequestException('Email já cadastrado');
      }

      const resultado = await this.usuarioRepository.cadastrar({
        email,
        nome,
        senha,
      });

      if (!resultado) {
        throw new BadRequestException('Ocorreu um erro ao cadastrar usuário');
      }

      return resultado;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  public async buscar(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.buscar(id);

    if (!usuario) {
      throw new NotFoundException('Usuario não encontrado');
    }

    return usuario;
  }

  public async listar(): Promise<Usuario[]> {
    const usuarios = await this.usuarioRepository.listar();

    if (!usuarios) {
      throw new NotFoundException('Nenhum usuario encontrado');
    }

    return usuarios;
  }

  public async excluir(id: number): Promise<any> {
    return this.usuarioRepository.excluir(id);
  }

  // public async atualizar(usuario: Usuario): Promise<Usuario> {
  //   await this.buscar(usuario.id);
  //   await this.usuarioRepository.atualizar(usuario);

  //   return usuario;
  // }

  // public async buscarUsuarioEmail(email: string): Promise<Usuario> {
  //   return await this.usuarioRepository.buscarPorEmail(email);
  // }
}
