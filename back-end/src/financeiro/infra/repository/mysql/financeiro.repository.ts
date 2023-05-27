import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async listar(): Promise<Financeiro[] | false> {
    try {
      const resultado = await this.financeiroRepository.find();

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
