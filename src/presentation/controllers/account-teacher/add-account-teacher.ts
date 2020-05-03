import { badRequest, duplicatedFieldError } from '../../adapters/http-error'
import { DuplicatedFieldError } from '../../errors/duplicated-field-error'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { Controller } from '../../protocols/controller'
import { DuplicatedField } from '../../protocols/duplicated-field'
import { HttpResponse, HttpRequest } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class AddAccountTeacherController implements Controller {
  constructor (
    private readonly validationEmail: Validation,
    private readonly validationCpf: Validation,
    private readonly duplicatedField: DuplicatedField
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.cpf) {
      return badRequest(new MissingParamError('cpf'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    if (!httpRequest.body.lattes) {
      return badRequest(new MissingParamError('lattes'))
    }
    if (!httpRequest.body.cv) {
      return badRequest(new MissingParamError('cv'))
    }

    const isValidEmail = this.validationEmail.validate(httpRequest.body.email)
    if (!isValidEmail) {
      return badRequest(new InvalidParamError('email'))
    }

    const isValidCpf = this.validationCpf.validate(httpRequest.body.cpf)
    if (!isValidCpf) {
      return badRequest(new InvalidParamError('cpf'))
    }

    const isDuplicated = await this.duplicatedField.isDuplicated('email')
    if (isDuplicated) {
      return duplicatedFieldError(new DuplicatedFieldError('email'))
    }
    // sucesso
    return Promise.resolve(null)
  }
}
