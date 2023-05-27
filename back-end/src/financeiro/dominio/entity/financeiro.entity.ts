import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from 'src/usuario/dominio/entity/usuario.entity';
import { FinanceiroDescricao } from './financeiroDescricao.entity';

@Entity()
export class Financeiro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dataHora: Date;

  @Column({ type: 'decimal' })
  valor: number;

  @Column({ type: 'tinyint', default: 0 })
  excluido: number;

  @ManyToOne(() => Usuario, ({ financeiro }) => financeiro)
  usuario: Usuario;

  @ManyToOne(() => FinanceiroDescricao, ({ financeiro }) => financeiro)
  financeiroDescricao: FinanceiroDescricao;
}
