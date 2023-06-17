import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtGuard } from 'src/core/auth/jwt.auth.guard';
import { StreamBuffer } from 'src/core/documentos/streamBuffer';
import { CadastrarFinanceiroCommand } from 'src/financeiro/dominio/command/cadastrarFinanceiro.command';
import { Financeiro } from 'src/financeiro/dominio/entity/financeiro.entity';
import { FinanceiroService } from '../service/financeiro.service';

@Controller('financeiro')
@UseGuards(JwtGuard)
export class FinanceiroController {
  constructor(public financeiroService: FinanceiroService) {}

  @Get('/servico/:id')
  listar(@Param('id') id: number): Promise<Financeiro[]> {
    return this.financeiroService.listar(id);
  }

  @Post('/servico/:id')
  cadastrar(
    @Param('id') servicoId: number,
    @Body() cadastrarFinanceiroCommand: CadastrarFinanceiroCommand,
    @Req() { user },
  ): Promise<Financeiro> {
    return this.financeiroService.cadastrar({
      ...cadastrarFinanceiroCommand,
      servicoId,
      usuarioId: user.id,
    });
  }

  @Get('/servico/:id/comanda')
  async comanda(@Param('id') servicoId: number, @Res() res: Response) {
    const resultado = await this.financeiroService.comanda(servicoId);

    new StreamBuffer(resultado).pipe(res);
  }

  @Delete(':id')
  exclui(@Param('id') id: number) {
    return this.financeiroService.exclui(id);
  }
}
