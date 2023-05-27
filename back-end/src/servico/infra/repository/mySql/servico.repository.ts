import { Injectable } from '@nestjs/common/decorators';
import { AtualizarServicoCommand } from '../../../dominio/command/atualizarServico.command';
import { CriaServicoCommand } from '../../../dominio/command/criaServico.command';
import { ListarServicoCommand } from '../../../dominio/command/listarServico.command';
import { Servico } from 'src/servico/dominio/entity/servico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectRepository(Servico)
    private servicoRepository: Repository<Servico>,
  ) {}

  async listar({
    finalizado,
    excluido,
  }: ListarServicoCommand): Promise<false | Servico[]> {
    try {
      const queryBuild = this.servicoRepository.createQueryBuilder();

      if (finalizado) {
        const finalizadoStrategy = {
          false: () => queryBuild.andWhere('finalizado IS NULL'),
          true: () => queryBuild.andWhere('finalizado IS NOT NULL'),
        };

        finalizadoStrategy[finalizado]();
      }

      const resultado = await queryBuild
        .andWhere('excluido = :excluido', { excluido })
        .orderBy('dataHora', 'DESC')
        .getMany();

      if (resultado.length <= 0) {
        return false;
      }

      return resultado;
    } catch (error) {
      return false;
    }
  }

  async buscar(id: number): Promise<Servico | false> {
    try {
      const resultado = await this.servicoRepository
        .createQueryBuilder()
        .where({
          id,
          excluido: 0,
        })
        .getOne();

      if (!resultado) {
        return false;
      }

      return resultado;
    } catch (error) {
      return false;
    }
  }

  async cria({
    clienteNome,
    clienteNumero,
    servicoModeloId,
    placa,
  }: CriaServicoCommand) {
    try {
      return await this.servicoRepository.save({
        clienteNome,
        clienteNumero,
        servicoModeloId,
        placa,
        dataHora: new Date(),
      });
    } catch (error) {
      return false;
    }
  }

  async atualizar({
    id,
    finalizado,
    excluido,
  }: AtualizarServicoCommand): Promise<boolean> {
    try {
      const queryBuild = this.servicoRepository.createQueryBuilder().update();
      if (finalizado) {
        queryBuild.set({ finalizado });
      }

      if ([0, 1].includes(excluido)) {
        queryBuild.set({ excluido });
      }

      const resultado = await queryBuild.where({ id }).execute();

      if (resultado.affected <= 0) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
