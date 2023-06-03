import { Usuario } from 'src/usuario/dominio/entity/usuario.entity';
import { Servico } from '../entity/servico.entity';
import { servico } from '@prisma/client';

export class ServicoQuery {
  servico: servico;
  // usuario: Usuario;
}
