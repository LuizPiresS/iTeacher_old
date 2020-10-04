import { Response } from 'express'

import type { Presenter } from '../../../core/common/presenter.interface'
import { UserBirthdateInvalidError } from '../../../core/user/error/user-birthdate-invalid.error'
import { UserCellphoneInvalidError } from '../../../core/user/error/user-cellphone-invalid.error'
import { UserCPFInvalidError } from '../../../core/user/error/user-cpf-invalid-error'
import { UserEmailInvalidError } from '../../../core/user/error/user-email-invalid.error'
import { isInstanceOf } from '../../../utils/instanceof.util'
import { UpdateUserResponse } from '../../../core/user/dto/update-user.response'

export class UpdateUserPresenter implements Presenter<UpdateUserResponse> {
  // eslint-disable-next-line no-useless-constructor
  constructor (private readonly res: Response) {}

  async reply (data: UpdateUserResponse): Promise<void> {
    // Transform DTO to Custom Format
    const responseJSON = { data }

    // Send data
    this.res.status(201).send(responseJSON)
  }

  async throw (error: Error): Promise<void> {
    if (
      isInstanceOf(error, [
        UserEmailInvalidError,
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
