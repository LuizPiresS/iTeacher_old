import type { User } from './user';

export interface UserRepository extends Repository<User> {
  findCPF(conditions?: FindOneOptions<User>): Promise<boolean>;
  findEmail(conditions?: FindOneOptions<User>): Promise<boolean>;
}
