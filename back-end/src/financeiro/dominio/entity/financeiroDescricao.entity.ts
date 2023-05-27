import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Financeiro } from './financeiro.entity';

@Entity()
export class FinanceiroDescricao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dataHora: Date;

  @Column({ type: 'varchar' })
  descricao: string;

  @OneToMany(() => Financeiro, (servico) => servico.financeiroDescricao)
  financeiro: Financeiro[];
}
