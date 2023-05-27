import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { createHash } from 'crypto';
import { CadastrarUsuarioCommand } from 'src/usuario/dominio/command/cadastrarUsuario.command';
import { LoginCommand } from 'src/usuario/dominio/command/login.command';
import { Usuario } from 'src/usuario/dominio/entity/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async buscarPorEmail(email: string): Promise<Usuario | false> {
    try {
      const resultado = await this.usuarioRepository.findOneBy({
        email,
      });

      if (!resultado) {
        return false;
      }

      return resultado;
    } catch (error) {
      return false;
    }
  }

  async cadastrar({
    email,
    nome,
    senha,
  }: CadastrarUsuarioCommand): Promise<Usuario | false> {
    try {
      return await this.usuarioRepository.save({
        email,
        nome,
        senha: createHash('md5').update(senha).digest('hex'),
      });
    } catch (error) {
      log(error);
      return false;
    }
  }

  async listar(): Promise<Usuario[] | false> {
    try {
      const usuarios = await this.usuarioRepository.find();

      if (!usuarios) {
        return false;
      }

      return usuarios;
    } catch (error) {
      return false;
    }
  }

  async buscar(id: number): Promise<Usuario | false> {
    try {
      const usuario = await this.usuarioRepository.findOneBy({
        id,
      });

      if (!usuario) {
        return null;
      }

      return usuario;
    } catch (error) {
      return false;
    }
  }

  async login({ email, senha }: LoginCommand) {
    try {
      const resultado = await this.usuarioRepository.findOneBy({
        email,
        senha: createHash('md5').update(senha).digest('hex'),
      });

      if (!resultado) {
        return false;
      }

      return resultado;
    } catch (error) {
      return false;
    }
  }

  async excluir(id: number) {
    return this.usuarioRepository.delete(id);
  }
}
