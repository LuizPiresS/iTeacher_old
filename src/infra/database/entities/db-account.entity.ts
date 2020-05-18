import { AccountEntity } from '@/domain/entities/account.entity'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity({ name: 'account' })
export class DbAccountEntity extends BaseEntity implements AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  birthDate: string;

  @Column()
  cellphone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn({ nullable: true })
  updatedAt!: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: string;
}
