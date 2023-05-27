import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/core/auth/jwt.auth.guard';
import { CriaServicoCommand } from 'src/servico/dominio/command/criaServico.command';
import { ListarServicoCommand } from 'src/servico/dominio/command/listarServico.command';
import { ServicoService } from '../service/servico.service';
import { Servico } from 'src/servico/dominio/entity/servico.entity';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('servico')
@Controller('servico')
@ApiSecurity('bearer')
@UseGuards(JwtGuard)
export class ServiceController {
  constructor(private servicoService: ServicoService) {}

  @Post()
  async cadastro(
    @Body() criaServicoCommand: CriaServicoCommand,
  ): Promise<Servico> {
    return await this.servicoService.cadastro(criaServicoCommand);
  }

  @Get()
  async listar(
    @Query() listarServicoCommand: ListarServicoCommand,
  ): Promise<Servico[]> {
    return await this.servicoService.listar(listarServicoCommand);
  }

  // @Get('/garantia/:id')
  // @Header('content-type', 'application/pdf')
  // async garantia(@Param('id') id: number, @Res() res: Response) {
  //   const pdf = await this.servicoService.garantia(id);

  //   new StreamBuffer(pdf).pipe(res);
  // }

  @Get('/:id')
  async buscar(@Param('id') id: number): Promise<Servico> {
    return await this.servicoService.buscar(id);
  }

  @Patch('/:id/exclui')
  async excluir(@Param('id') id: number) {
    return await this.servicoService.excluir(id);
  }

  @Patch('/:id/finaliza')
  async finalizar(@Param('id') id: number) {
    return await this.servicoService.finalizar(id);
  }
}
