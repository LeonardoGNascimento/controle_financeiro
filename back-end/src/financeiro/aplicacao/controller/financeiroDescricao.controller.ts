import { Body, Controller, Get, Post } from '@nestjs/common';
import { FinanceiroDescricaoService } from '../service/financeiroDescricao.service';
import { FinanceiroDescricao } from 'src/financeiro/dominio/entity/financeiroDescricao.entity';
import { CadastrarFinanceiroDescricaoCommand } from 'src/financeiro/dominio/command/cadastrarFinanceiroDescricao.command';
@Controller('/financeiro/descricao')
export class FinanceiroDescricaoController {
  constructor(public financeiroDescricaoService: FinanceiroDescricaoService) {}

  @Get()
  listar(): Promise<FinanceiroDescricao[]> {
    return this.financeiroDescricaoService.listar();
  }

  @Post()
  cadastrar(
    @Body()
    cadastrarFinanceiroDescricaoCommand: CadastrarFinanceiroDescricaoCommand,
  ): Promise<FinanceiroDescricao> {
    return this.financeiroDescricaoService.cadastrar(
      cadastrarFinanceiroDescricaoCommand,
    );
  }
}
