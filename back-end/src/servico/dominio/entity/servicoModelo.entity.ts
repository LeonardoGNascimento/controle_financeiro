import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Servico } from './servico.entity';

@Entity()
export class ServicoModelo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dataHora: Date;

  @Column({ type: 'varchar' })
  nome: string;

  @OneToMany(() => Servico, (servico) => servico.servicoModelo)
  servicos: Servico[];
}
