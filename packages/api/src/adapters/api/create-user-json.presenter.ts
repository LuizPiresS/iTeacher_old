import { Response } from 'express'

import type { Presenter } from '../../core/common/presenter.interface'
import type { CreateUserResponse } from '../../core/user/dto/create-user.response'
import { UserBirthdateInvalidError } from '../../core/user/error/user-birthdate-invalid.error'
import { UserCellphoneInvalidError } from '../../core/user/error/user-cellphone-invalid.error'
import { UserCPFInvalidError } from '../../core/user/error/user-cpf-invalid-error'
import { UserDuplicatedCPFError } from '../../core/user/error/user-duplicated-cpf.error'
import { UserDuplicatedEmailError } from '../../core/user/error/user-duplicated-email.error'
import { UserEmailInvalidError } from '../../core/user/error/user-email-invalid.error'
import { UserPasswordInvalidError } from '../../core/user/error/user-password-invalid.error'
import { isInstanceOf } from '../../utils/instanceof.util'

export class CreateUserJSONPresenter implements Presenter<CreateUserResponse> {
  constructor(private readonly res: Response) {}

  async reply(data: CreateUserResponse): Promise<void> {
    // Transform DTO to Custom Format
    const responseJSON = { email: data.email }

    // Send data
    this.res.status(201).send(responseJSON)
  }

  async throw(error: Error): Promise<void> {
    if (
      isInstanceOf(error, [
        UserEmailInvalidError,
        UserPasswordInvalidError,
        UserDuplicatedEmailError,
        UserDuplicatedCPFError,
        UserBirthdateInvalidError,
        UserCellphoneInvalidError,
        UserCPFInvalidError,
        UserEmailInvalidError
      ])
    ) {
      // Format exception
      const responseJSON = {
        statusCode: 400,
        error: { message: error.message }
      }

      // Send data
      this.res.status(400).send(responseJSON)
    }

    // Format exception
    const responseJSON = {
      statusCode: 500,
      error: { message: 'Internal Server Error', details: error.stack }
    }

    // Send data
    this.res.status(500).send(responseJSON)
  }
}
