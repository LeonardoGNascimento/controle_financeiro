import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/dominio/entity/usuario.entity';
import { ServicoModule } from './servico/servico.module';
import { Servico } from './servico/dominio/entity/servico.entity';
import { ServicoModelo } from './servico/dominio/entity/servicoModelo.entity';
import { Financeiro } from './financeiro/dominio/entity/financeiro.entity';
import { FinanceiroDescricao } from './financeiro/dominio/entity/financeiroDescricao.entity';
import { FinanceiroModule } from './financeiro/financeiro.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '',
      host: '127.0.0.1',
      database: 'mecanica',
      entities: [
        Usuario,
        Servico,
        ServicoModelo,
        Financeiro,
        FinanceiroDescricao,
      ],
      synchronize: true,
    }),
    UsuarioModule,
    ServicoModule,
    FinanceiroModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
