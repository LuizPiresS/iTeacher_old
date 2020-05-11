import { AddAccount } from '@/domain/usecases/account/add-account'
import { badRequest, duplicatedFieldError, serverError, ok } from '@/presentation/adapters/http-error'
import { DuplicatedFieldError } from '@/presentation/errors/duplicated-field-error'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { Controller } from '@/presentation/protocols/controller'
import { DuplicatedField } from '@/presentation/protocols/duplicated-field'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'

export class AddAccountController implements Controller {
  constructor (
    private readonly validationEmail: Validation,
    private readonly duplicatedField: DuplicatedField,
    private readonly addAccount: AddAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password', 'name']

      for (const fieldName of requiredFields) {
        if (!httpRequest.body[fieldName]) {
          return badRequest(new MissingParamError(fieldName))
        }
      }

      const { email } = httpRequest.body

      const isValidEmail = this.validationEmail.validate(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      const isDuplicated = await this.duplicatedField.isDuplicated('email')
      if (isDuplicated) {
        return duplicatedFieldError(new DuplicatedFieldError('email'))
      }

      // Sucesso
      return ok(await this.addAccount.add(httpRequest.body))
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
