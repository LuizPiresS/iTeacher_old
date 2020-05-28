import { getRepository } from 'typeorm';

import { IUser } from '../../core/user/user';
import { IUserRepository } from '../../core/user/user.repository.interface';
import { UserEntity } from '../entities/user.entity';

export class UserDataSource implements IUserRepository {
  private repository = getRepository(UserEntity);

  async find(conditions?: FindManyOptions<IUser>): Promise<IUser[]> {
    return this.repository.find(conditions);
  }
  async findOne(
    conditions?: FindOneOptions<IUser>,
  ): Promise<IUser | undefined> {
    return this.repository.findOne({ where: conditions });
  }
  async save(data: DeepPartial<IUser>): Promise<IUser> {
    return this.repository.save(data);
  }
  async delete(id: string): Promise<void> {
    return this.delete(id);
  }
}
