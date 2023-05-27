import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Financeiro } from 'src/financeiro/dominio/entity/financeiro.entity';
import { FinanceiroService } from '../service/financeiro.service';
import { CadastrarFinanceiroCommand } from 'src/financeiro/dominio/command/cadastrarFinanceiro.command';
import { Request } from 'express';
import { log } from 'console';
import { JwtGuard } from 'src/core/auth/jwt.auth.guard';

@Controller('financeiro')
@UseGuards(JwtGuard)
export class FinanceiroController {
  constructor(public financeiroService: FinanceiroService) {}

  @Get()
  listar(): Promise<Financeiro[]> {
    return this.financeiroService.listar();
  }

  @Post()
  cadastrar(
    @Body() cadastrarFinanceiroCommand: CadastrarFinanceiroCommand,
    @Req() { user },
  ): Promise<Financeiro> {
    return this.financeiroService.cadastrar({
      ...cadastrarFinanceiroCommand,
      usuarioId: user.id,
    });
  }
}
