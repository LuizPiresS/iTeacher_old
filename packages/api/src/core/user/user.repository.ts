import { UpdateUserResponse } from './dto/update-user.response'
import { UpdateUserRequest } from './dto/update-user.request'
import type { User } from './user'

export interface UserRepository extends Repository<User> {
  updateUser(id: string, data: UpdateUserRequest): Promise<UpdateUserResponse>
  findCPF(conditions?: FindOneOptions<User>): Promise<boolean>
  findEmail(conditions?: FindOneOptions<User>): Promise<boolean>
}
