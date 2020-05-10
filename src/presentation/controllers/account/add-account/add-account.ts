import { badRequest, duplicatedFieldError, serverError, ok } from '../../../adapters/http-error'
import {
  Validation,
  DuplicatedField,
  HttpRequest,
  HttpResponse,
  MissingParamError,
  InvalidParamError,
  DuplicatedFieldError,
  Controller,
  AddAccountTeacher
} from './add-account-protocols'

export class AddAccountController implements Controller {
  constructor (
    private readonly validationEmail: Validation,
    private readonly duplicatedField: DuplicatedField,
    private readonly addAccount: AddAccountTeacher
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
