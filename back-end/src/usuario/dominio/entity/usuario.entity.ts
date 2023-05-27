import { Financeiro } from 'src/financeiro/dominio/entity/financeiro.entity';
import { Servico } from 'src/servico/dominio/entity/servico.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nome: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  senha: string;

  @OneToMany(() => Servico, (servico) => servico.usuario)
  servicos: Servico[];

  @OneToMany(() => Financeiro, (financeiro) => financeiro.usuario)
  financeiro: Financeiro[];
}
