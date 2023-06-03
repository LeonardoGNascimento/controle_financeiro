import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { CadastrarFinanceiroCommand } from 'src/financeiro/dominio/command/cadastrarFinanceiro.command';
import { Financeiro } from 'src/financeiro/dominio/entity/financeiro.entity';
import { FinanceiroDescricao } from 'src/financeiro/dominio/entity/financeiroDescricao.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FinanceiroRepository {
  constructor(
    @InjectRepository(Financeiro)
    private financeiroRepository: Repository<Financeiro>,
  ) {}

  async listar(id: number): Promise<Financeiro[] | false> {
    try {
      const queryBuild = this.financeiroRepository
        .createQueryBuilder('financeiro')
        .leftJoinAndSelect(
          'financeiro.financeiroDescricao',
          'financeiroDescricao',
        )
        .where('financeiro.servicoId = :id', { id });

      const resultado = await queryBuild.getMany();

      if (resultado.length <= 0) {
        return false;
      }

      return resultado;
    } catch (error) {
      return false;
    }
  }

  async cadastrar({
    financeiroDescricaoId,
    usuarioId,
    valor,
    servicoId,
  }: CadastrarFinanceiroCommand): Promise<Financeiro | false> {
    try {
      const resultado = await this.financeiroRepository.save({
        valor,
        usuario: {
          id: usuarioId,
        },
        financeiroDescricao: {
          id: financeiroDescricaoId,
        },
        servico: {
          id: servicoId,
        },
      });

      if (!resultado) {
        return false;
      }

      return resultado;
    } catch (e) {
      return false;
    }
  }
}
