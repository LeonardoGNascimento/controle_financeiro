import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CadastrarFinanceiroCommand } from 'src/financeiro/dominio/command/cadastrarFinanceiro.command';
import { Financeiro } from 'src/financeiro/dominio/entity/financeiro.entity';
import { FinanceiroRepository } from 'src/financeiro/infra/repository/mysql/financeiro.repository';
import { FinanceiroDescricaoService } from './financeiroDescricao.service';

@Injectable()
export class FinanceiroService {
  constructor(
    public financeiroRepository: FinanceiroRepository,
    public financeiroDescricaoService: FinanceiroDescricaoService,
  ) {}

  async listar(): Promise<Financeiro[]> {
    const resultado = await this.financeiroRepository.listar();

    if (!resultado) {
      throw new NotFoundException('Financeiro não encontrado');
    }

    return resultado;
  }

  async cadastrar({
    financeiroDescricaoId,
    usuarioId,
    valor,
  }: CadastrarFinanceiroCommand): Promise<Financeiro> {
    try {
      await this.financeiroDescricaoService.buscar(financeiroDescricaoId);

      const resultado = await this.financeiroRepository.cadastrar({
        financeiroDescricaoId,
        usuarioId,
        valor,
      });

      if (!resultado) {
        throw new BadRequestException('Ocorreu um erro ao salvar financeiro');
      }

      return resultado;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
