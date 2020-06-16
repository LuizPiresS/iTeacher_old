import { getRepository } from 'typeorm';

import { User } from '../../core/auth/user';
import { UserRepository } from '../../core/auth/user.repository';
import { UserEntity } from '../entities/user.entity';

export class UserDataSource implements UserRepository {
  private repository = getRepository(UserEntity);

  async find(conditions?: FindManyOptions<User>): Promise<User[]> {
    return this.repository.find(conditions);
  }
  async findOne(conditions?: FindOneOptions<User>): Promise<User | undefined> {
    return this.repository.findOne({ where: conditions });
  }
  async save(data: DeepPartial<User>): Promise<User> {
    return this.repository.save(data);
  }
  async delete(id: string): Promise<void> {
    return this.delete(id);
  }
}
