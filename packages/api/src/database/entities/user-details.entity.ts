import { UserEntity } from './user.entity'
import { UserDetails } from './../../core/user/user'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm'

@Entity('user_details')
export class UserDetailsEntity implements UserDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({
    length: 11
  })
  cpf: string

  @Column({
    type: 'date'
  })
  birthdate: string

  @Column({
    length: 11
  })
  cellphone: string

  @Column()
  email: string

  @Column()
  password: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  @DeleteDateColumn()
  deletedAt: string

  @OneToOne(type => UserEntity, userDetail => UserDetailsEntity)
  @JoinColumn() // cria a coluna do relacionamento na tabela
  user: UserEntity
}
