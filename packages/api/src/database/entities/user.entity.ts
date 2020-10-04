import { UserDetailsEntity } from './user-details.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'
import { User } from '../../core/user/user'

@Entity('user')
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  @DeleteDateColumn()
  deletedAt: string

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne(type => UserDetailsEntity, user => UserEntity)
  userDetails: UserDetailsEntity
}
