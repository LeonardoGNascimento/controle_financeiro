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
import { log } from 'console';
import { DocumentoService } from 'src/core/documentos/documento.service';

@Injectable()
export class FinanceiroService {
  constructor(
    public financeiroRepository: FinanceiroRepository,
    public financeiroDescricaoService: FinanceiroDescricaoService,
    public documentoService: DocumentoService,
  ) {}

  async listar(id: number): Promise<Financeiro[]> {
    const resultado = await this.financeiroRepository.listar(id);

    if (!resultado) {
      throw new NotFoundException('Financeiro não encontrado');
    }

    return resultado;
  }

  async comanda(id: number): Promise<Buffer> {
    const dados = await this.listar(id);
    const total = Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }).format(dados.map((item) => Number(item.valor)).reduce((i, c) => i + c));

    const resultado = dados.map((item) => ({
      valor: Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(item.valor)),
      financeiroDescricao: {
        descricao: item.financeiroDescricao.descricao,
      },
    }));

    return await this.documentoService.gerarDocumento(
      { dados: resultado, total },
      './src/core/template/comanda.hbs',
    );
  }

  async cadastrar({
    financeiroDescricaoId,
    usuarioId,
    valor,
    servicoId,
  }: CadastrarFinanceiroCommand): Promise<Financeiro> {
    try {
      await this.financeiroDescricaoService.buscar(financeiroDescricaoId);

      const resultado = await this.financeiroRepository.cadastrar({
        financeiroDescricaoId,
        usuarioId,
        valor,
        servicoId,
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
