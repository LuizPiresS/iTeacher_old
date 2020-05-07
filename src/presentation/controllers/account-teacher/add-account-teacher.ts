import { badRequest, duplicatedFieldError, serverError, ok } from '../../adapters/http-error'
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

export class AddAccountTeacherController implements Controller {
  constructor (
    private readonly validationEmail: Validation,
    private readonly validationCpf: Validation,
    private readonly duplicatedField: DuplicatedField,
    private readonly addAccount: AddAccountTeacher
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'cpf', 'email', 'lattes', 'cv', 'password']

      for (const fieldName of requiredFields) {
        if (!httpRequest.body[fieldName]) {
          return badRequest(new MissingParamError(fieldName))
        }
      }

      const { email, cpf } = httpRequest.body

      const isValidEmail = this.validationEmail.validate(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      const isValidCpf = this.validationCpf.validate(cpf)
      if (!isValidCpf) {
        return badRequest(new InvalidParamError('cpf'))
      }

      const isDuplicated = await this.duplicatedField.isDuplicated('cpf')
      if (isDuplicated) {
        return duplicatedFieldError(new DuplicatedFieldError('cpf'))
      }

      // Sucesso
      return ok(await this.addAccount.add(httpRequest.body))
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
