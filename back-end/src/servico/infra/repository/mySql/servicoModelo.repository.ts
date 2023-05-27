import { Injectable } from '@nestjs/common/decorators';
import { CriaServicoModeloCommand } from '../../../dominio/command/criaServicoModelo.command';
import { ServicoModelo } from 'src/servico/dominio/entity/servicoModelo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceModeloRepository {
  constructor(
    @InjectRepository(ServicoModelo)
    private servicoModeloRepository: Repository<ServicoModelo>,
  ) {}

  async listar(): Promise<ServicoModelo[]> {
    try {
      return await this.servicoModeloRepository.find();
    } catch (error) {
      return [];
    }
  }

  async buscar(id: number): Promise<ServicoModelo | false> {
    try {
      const resultado = await this.servicoModeloRepository.findOneBy({
        id,
      });

      if (!resultado) {
        return false;
      }

      return resultado;
    } catch (error) {
      return false;
    }
  }

  async cadastro({
    nome,
  }: CriaServicoModeloCommand): Promise<false | ServicoModelo> {
    try {
      return await this.servicoModeloRepository.save({
        dataHora: new Date(),
        nome,
      });
    } catch (error) {
      return false;
    }
  }
}
