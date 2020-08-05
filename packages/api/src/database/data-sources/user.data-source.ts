import { User } from '../../core/user/user'
import { UserRepository } from '../../core/user/user.repository'
import { UserEntity } from '../entities/user.entity'
import { getRepository } from 'typeorm'

export class UserDataSource implements UserRepository {
  private repository = getRepository(UserEntity)

  async findCPF(conditions?: FindOneOptions<User>): Promise<boolean> {
    return !!(await this.findOne(conditions))
  }

  async findEmail(conditions?: FindOneOptions<User>): Promise<boolean> {
    return !!(await this.findOne(conditions))
  }

  async find(conditions?: FindManyOptions<User>): Promise<User[]> {
    return this.repository.find(conditions)
  }

  async findOne(conditions?: FindOneOptions<User>): Promise<User | undefined> {
    return this.repository.findOne({ where: conditions })
  }

  async save(data: DeepPartial<User>): Promise<User> {
    return this.repository.save(data)
  }

  async delete(id: string): Promise<void> {
    return this.delete(id)
  }
}
