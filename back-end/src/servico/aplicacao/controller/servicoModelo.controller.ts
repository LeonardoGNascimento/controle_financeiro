import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/core/auth/jwt.auth.guard';
import { CriaServicoModeloCommand } from 'src/servico/dominio/command/criaServicoModelo.command';
import { ServicoModelo } from 'src/servico/dominio/entity/servicoModelo.entity';
import { ServicoModeloService } from '../service/servicoModelo.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('servico')
@Controller('servico/modelo')
@UseGuards(JwtGuard)
export class ServiceModeloController {
  constructor(private servicoModeloService: ServicoModeloService) {}

  @Post()
  async cadastro(
    @Body() criaServicoModeloCommand: CriaServicoModeloCommand,
  ): Promise<ServicoModelo> {
    return await this.servicoModeloService.cadastro(criaServicoModeloCommand);
  }

  @Get()
  async listar(): Promise<ServicoModelo[]> {
    return await this.servicoModeloService.listar();
  }

  @Get('/:id')
  async buscar(@Param('id') id: number): Promise<ServicoModelo> {
    return await this.servicoModeloService.buscar(id);
  }
}
