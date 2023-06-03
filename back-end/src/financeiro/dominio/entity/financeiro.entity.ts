import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from 'src/usuario/dominio/entity/usuario.entity';
import { FinanceiroDescricao } from './financeiroDescricao.entity';
import { Servico } from 'src/servico/dominio/entity/servico.entity';

@Entity()
export class Financeiro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dataHora: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'tinyint', default: 0 })
  excluido: number;

  @ManyToOne(() => Usuario, ({ financeiro }) => financeiro)
  usuario: Usuario;

  @ManyToOne(() => Servico, ({ financeiro }) => financeiro)
  servico: Servico;

  @ManyToOne(() => FinanceiroDescricao, ({ financeiro }) => financeiro)
  financeiroDescricao: FinanceiroDescricao;
}
