import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CriaServicoModeloCommand } from '../../dominio/command/criaServicoModelo.command';
import { ServicoModelo } from 'src/servico/dominio/entity/servicoModelo.entity';
import { ServiceModeloRepository } from 'src/servico/infra/repository/mySql/servicoModelo.repository';

@Injectable()
export class ServicoModeloService {
  constructor(private serviceModeloRepository: ServiceModeloRepository) {}

  async listar(): Promise<ServicoModelo[]> {
    return await this.serviceModeloRepository.listar();
  }

  async buscar(id: number) {
    const resultado = await this.serviceModeloRepository.buscar(id);

    if (!resultado) {
      throw new NotFoundException('Modelo não encontrado');
    }

    return resultado;
  }

  async cadastro(
    criaServicoModeloCommand: CriaServicoModeloCommand,
  ): Promise<ServicoModelo> {
    const resultado = await this.serviceModeloRepository.cadastro(
      criaServicoModeloCommand,
    );

    if (!resultado) {
      throw new BadRequestException(
        'Ocorreu um erro ao cadastrar serviço modelo',
      );
    }

    return resultado;
  }
}
