import { UpdateUserResponse } from '../dto/update-user.response'
import { UpdateUserRequest } from '../dto/update-user.request'
import type { Presenter } from '../../common/presenter.interface'
import type { Validator } from '../../common/validator.interface'

import type { UserRepository } from '../user.repository'
import {
  UserNameInvalidError,
  UserCPFInvalidError,
  UserBirthdateInvalidError,
  UserCellphoneInvalidError,
  UserEmailInvalidError
} from '../error'
export class UpdateUserInteractor {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly presenter: Presenter<UpdateUserResponse>,
    private readonly validation: Validator
  ) {}

  async execute(data: UpdateUserRequest): Promise<void> {
    try {
      // Input data validations
      if (!data.name) {
        throw new UserNameInvalidError('invalid name')
      }

      if (!this.validation.isCPF(data.cpf)) {
        throw new UserCPFInvalidError('invalid cpf')
      }

      if (!this.validation.isDate(data.birthdate)) {
        throw new UserBirthdateInvalidError('invalid birthdate')
      }

      if (!this.validation.isCellphone(data.cellphone)) {
        throw new UserCellphoneInvalidError('invalid cellphone')
      }

      if (!this.validation.isEmail(data.email)) {
        throw new UserEmailInvalidError('invalid e-mail')
      }

      data.cpf = data.cpf.replace(/[.-]/g, '')

      // Data persistence
      const {
        id,
        name,
        cpf,
        birthdate,
        cellphone,
        email
      } = await this.userRepository.updateUser(data.id, data)

      // Presenter success response
      await this.presenter.reply({
        id,
        name,
        cpf,
        birthdate,
        cellphone,
        email
      })
    } catch (error) {
      // Presenter error response
      await this.presenter.throw(error)
    }
  }
}
