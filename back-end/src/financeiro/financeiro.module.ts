import { Module } from '@nestjs/common';
import { FinanceiroDescricaoController } from './aplicacao/controller/financeiroDescricao.controller';
import { FinanceiroDescricaoService } from './aplicacao/service/financeiroDescricao.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceiroDescricao } from './dominio/entity/financeiroDescricao.entity';
import { Financeiro } from './dominio/entity/financeiro.entity';
import { FinanceiroDescricaoRepository } from './infra/repository/mysql/financeiroDescricao.repository';
import { FinanceiroController } from './aplicacao/controller/financeiro.controller';
import { FinanceiroService } from './aplicacao/service/financeiro.service';
import { FinanceiroRepository } from './infra/repository/mysql/financeiro.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FinanceiroDescricao, Financeiro])],
  controllers: [FinanceiroDescricaoController, FinanceiroController],
  providers: [
    FinanceiroDescricaoService,
    FinanceiroDescricaoRepository,
    FinanceiroService,
    FinanceiroRepository,
  ],
})
export class FinanceiroModule {}
