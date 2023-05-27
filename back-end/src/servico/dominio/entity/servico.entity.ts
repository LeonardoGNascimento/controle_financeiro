import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ServicoModelo } from './servicoModelo.entity';
import { Usuario } from 'src/usuario/dominio/entity/usuario.entity';

@Entity()
export class Servico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dataHora: Date;

  @Column({ type: 'varchar' })
  clienteNome: string;

  @Column({ type: 'varchar' })
  clienteNumero: string;

  @Column({ type: 'varchar' })
  placa: string;

  @Column({ type: 'datetime', default: null })
  finalizado?: Date;

  @Column({ type: 'tinyint' })
  excluido: number;

  @ManyToOne(() => ServicoModelo, (servicoModelo) => servicoModelo.servicos)
  servicoModelo: ServicoModelo;

  @ManyToOne(() => Usuario, (usuario) => usuario.servicos)
  usuario: Usuario;
}
