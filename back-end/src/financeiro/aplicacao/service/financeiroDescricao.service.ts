import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CadastrarFinanceiroDescricaoCommand } from 'src/financeiro/dominio/command/cadastrarFinanceiroDescricao.command';
import { FinanceiroDescricao } from 'src/financeiro/dominio/entity/financeiroDescricao.entity';
import { FinanceiroDescricaoRepository } from 'src/financeiro/infra/repository/mysql/financeiroDescricao.repository';

@Injectable()
export class FinanceiroDescricaoService {
  constructor(
    public financeiroDescricaoRepository: FinanceiroDescricaoRepository,
  ) {}

  async listar(): Promise<FinanceiroDescricao[]> {
    const resultado = await this.financeiroDescricaoRepository.listar();

    if (!resultado) {
      throw new NotFoundException('Nenhuma descrição encontrada');
    }

    return resultado;
  }

  async cadastrar(
    cadastrarFinanceiroDescricaoCommand: CadastrarFinanceiroDescricaoCommand,
  ): Promise<FinanceiroDescricao> {
    const resultado = await this.financeiroDescricaoRepository.cadastrar(
      cadastrarFinanceiroDescricaoCommand,
    );

    if (!resultado) {
      throw new BadRequestException('Ocorreu um erro ao salvar descrição');
    }

    return resultado;
  }

  async buscar(id: number): Promise<FinanceiroDescricao> {
    const resultado = await this.financeiroDescricaoRepository.buscar(id);

    if (!resultado) {
      throw new NotFoundException('Nenhuma descrição encontrada');
    }

    return resultado;
  }
}
