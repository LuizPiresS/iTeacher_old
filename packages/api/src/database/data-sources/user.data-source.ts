import { UpdateUserRequest } from './../../core/user/dto/update-user.request'
import { UserDetails } from '../../core/user/user'
import { UserRepository } from '../../core/user/user.repository'
import { UserEntity } from '../entities/user.entity'
import { getRepository } from 'typeorm'
import { UpdateUserResponse } from '../../core/user/dto/update-user.response'
import { UserDetailsEntity } from '../entities/user-details.entity'

export class UserDataSource implements UserRepository {
  private repositoryUser = getRepository(UserEntity)
  private repositoryUserDetails = getRepository(UserDetailsEntity)

  async findCPF(cpf: string): Promise<boolean> {
    return !!(await this.repositoryUserDetails.findOne({ cpf: cpf }))
  }

  async findEmail(email: string): Promise<boolean> {
    return !!(await this.repositoryUserDetails.findOne({ email: email }))
  }

  async findUser(id: string): Promise<UserDetails> {
    return this.repositoryUserDetails.findOne({ id: id })
  }

  // TODO: refatorar a atribuição dos campos
  async save(data: UserDetails): Promise<UserDetails> {
    const user = new UserEntity()
    await this.repositoryUser.save(user)

    const userDetails = new UserDetailsEntity()
    userDetails.user = user

    userDetails.birthdate = data.birthdate
    userDetails.cellphone = data.cellphone
    userDetails.cpf = data.cpf
    userDetails.email = data.email
    userDetails.name = data.name
    userDetails.password = data.password

    return await this.repositoryUserDetails.save(userDetails)
  }

  async updateUser(
    id: string,
    data: UpdateUserRequest
  ): Promise<UpdateUserResponse> {
    await this.repositoryUserDetails.update(id, data)
    return data
  }

  async delete(id: string): Promise<void> {
    return await this.delete(id)
  }
}
