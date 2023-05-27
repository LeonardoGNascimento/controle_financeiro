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
  cadastro(@Body() criaServicoCommand: CriaServicoCommand): Promise<Servico> {
    return this.servicoService.cadastro(criaServicoCommand);
  }

  @Get()
  listar(
    @Query() listarServicoCommand: ListarServicoCommand,
  ): Promise<Servico[]> {
    return this.servicoService.listar(listarServicoCommand);
  }

  // @Get('/garantia/:id')
  // @Header('content-type', 'application/pdf')
  //  garantia(@Param('id') id: number, @Res() res: Response) {
  //   const pdf =  this.servicoService.garantia(id);

  //   new StreamBuffer(pdf).pipe(res);
  // }

  @Get('/:id')
  buscar(@Param('id') id: number): Promise<Servico> {
    return this.servicoService.buscar(id);
  }

  @Patch('/:id/exclui')
  excluir(@Param('id') id: number) {
    return this.servicoService.excluir(id);
  }

  @Patch('/:id/finaliza')
  finalizar(@Param('id') id: number) {
    return this.servicoService.finalizar(id);
  }
}
