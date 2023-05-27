import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ListarServicoCommand } from '../../dominio/command/listarServico.command';
import { CriaServicoCommand } from '../../dominio/command/criaServico.command';
import { AtualizarServicoCommand } from '../../dominio/command/atualizarServico.command';
import { FinalizarServicoCommand } from '../../dominio/command/finalizarServico.command';
import { ServiceRepository } from 'src/servico/infra/repository/mySql/servico.repository';
import { Servico } from 'src/servico/dominio/entity/servico.entity';

@Injectable()
export class ServicoService {
  constructor(private serviceRepository: ServiceRepository) {}

  async listar(listarServicoCommand: ListarServicoCommand): Promise<Servico[]> {
    const resultado = await this.serviceRepository.listar(listarServicoCommand);

    if (!resultado) {
      throw new NotFoundException('Serviço não encontrado');
    }

    return resultado;
  }

  async buscar(id: number): Promise<Servico> {
    const resultado = await this.serviceRepository.buscar(id);

    if (!resultado) {
      throw new NotFoundException('Serviço não encontrado');
    }

    return resultado;
  }

  // async garantia(id: number): Promise<any> {
  //   try {
  //     const { imei, clienteNome, dataHora, servicoModelo } = await this.buscar({
  //       id,
  //       servicoModelo: 'true',
  //     });

  //     const strategyTemplate = {
  //       imei: './src/core/template/garantia.hbs',
  //       sem_imei: './src/core/template/garantia_sem_imei.hbs',
  //     };

  //     const templateEscolha = imei ? 'imei' : 'sem_imei';

  //     return this.documentoService.gerarDocumento(
  //       {
  //         data: Data.getDateBr(new Date()),
  //         imei,
  //         servicoModelo: servicoModelo.nome,
  //         cliente: clienteNome,
  //         servicoId: id,
  //       },
  //       strategyTemplate[templateEscolha],
  //     );
  //   } catch (error) {}
  // }

  async cadastro(criaServicoCommand: CriaServicoCommand): Promise<Servico> {
    const servico = await this.serviceRepository.cria(criaServicoCommand);

    if (!servico) {
      throw new BadRequestException(
        'Ocorreu um erro ao cadastrar um novo serviço',
      );
    }

    return servico;
  }

  async atualizar(atualizarServicoCommand: AtualizarServicoCommand) {
    const resultado = await this.serviceRepository.atualizar(
      atualizarServicoCommand,
    );

    if (!resultado) {
      throw new BadRequestException('Ocorreu um erro ao atualizar');
    }

    return resultado;
  }

  async finalizar(id: number) {
    return await this.atualizar({
      id,
      finalizado: new Date(),
    });
  }

  async excluir(id: number): Promise<boolean> {
    try {
      await this.buscar(id);
      return await this.atualizar({
        id,
        excluido: 1,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
