import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servico } from './dominio/entity/servico.entity';
import { ServicoModelo } from './dominio/entity/servicoModelo.entity';
import { ServiceController } from './aplicacao/controller/servico.controller';
import { ServiceModeloController } from './aplicacao/controller/servicoModelo.controller';
import { ServicoService } from './aplicacao/service/servico.service';
import { ServicoModeloService } from './aplicacao/service/servicoModelo.service';
import { ServiceRepository } from './infra/repository/mySql/servico.repository';
import { ServiceModeloRepository } from './infra/repository/mySql/servicoModelo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Servico, ServicoModelo])],
  controllers: [ServiceModeloController, ServiceController],
  providers: [
    ServicoService,
    ServicoModeloService,
    ServiceRepository,
    ServiceModeloRepository,
  ],
})
export class ServicoModule {}
