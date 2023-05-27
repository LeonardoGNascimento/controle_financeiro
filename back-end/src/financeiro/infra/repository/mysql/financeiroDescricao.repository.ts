import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CadastrarFinanceiroDescricaoCommand } from 'src/financeiro/dominio/command/cadastrarFinanceiroDescricao.command';
import { FinanceiroDescricao } from 'src/financeiro/dominio/entity/financeiroDescricao.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FinanceiroDescricaoRepository {
  constructor(
    @InjectRepository(FinanceiroDescricao)
    private financeiroDescricaoRepository: Repository<FinanceiroDescricao>,
  ) {}

  async listar(): Promise<FinanceiroDescricao[] | false> {
    try {
      const resultado = await this.financeiroDescricaoRepository.find();

      if (resultado.length <= 0) {
        return false;
      }

      return resultado;
    } catch (error) {
      return false;
    }
  }

  async cadastrar(
    cadastrarFinanceiroDescricaoCommand: CadastrarFinanceiroDescricaoCommand,
  ): Promise<FinanceiroDescricao | false> {
    try {
      const resultado = await this.financeiroDescricaoRepository.save(
        cadastrarFinanceiroDescricaoCommand,
      );

      if (!resultado) {
        return false;
      }

      return resultado;
    } catch (e) {
      return false;
    }
  }

  async buscar(id: number): Promise<FinanceiroDescricao | false> {
    try {
      const resultado = await this.financeiroDescricaoRepository.findOneBy({
        id,
      });

      if (!resultado) {
        return false;
      }

      return resultado;
    } catch (error) {
      return false;
    }
  }
}
