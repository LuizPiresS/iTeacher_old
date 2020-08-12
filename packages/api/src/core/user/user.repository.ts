import { CreateUserRequest } from './dto/create-user.request'
import { UpdateUserResponse } from './dto/update-user.response'
import { UpdateUserRequest } from './dto/update-user.request'
import type { UserDetails } from './user'

export interface UserRepository {
  findUser(id: string): Promise<UserDetails>

  save(data: CreateUserRequest): Promise<UserDetails>

  delete(id: string): Promise<void>

  updateUser(id: string, data: UpdateUserRequest): Promise<UpdateUserResponse>

  findCPF(cpf: string): Promise<boolean>

  findEmail(email: string): Promise<boolean>
}
