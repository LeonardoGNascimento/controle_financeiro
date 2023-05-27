import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from 'src/core/auth/jwt.strategy';
import { UsuarioController } from './aplicacao/controllers/usuario.controller';
import { UsuarioService } from './aplicacao/services/usuario.service';
import { UsuarioRepository } from './infra/repository/mysql/usuario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './dominio/entity/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.register({
      secret: 'abc',
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository, JwtStrategy],
})
export class UsuarioModule {}
