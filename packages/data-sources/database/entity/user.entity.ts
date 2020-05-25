import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { User } from '../../../core/user/user';

@Entity()
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  cpf!: string;

  @Column()
  birthdate!: string;

  @Column()
  cellphone!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  createdAt!: string;

  @Column()
  updatedAt!: string;

  @Column()
  deletedAt!: string;

  @Column()
  firstName!: string;
}
