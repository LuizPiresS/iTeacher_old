import { badRequest } from '../../adapters/http-error'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { Controller } from '../../protocols/controller'
import { HttpResponse, HttpRequest } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class AddAccountTeacherController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  handle (httpRequest: HttpRequest): HttpResponse {
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

    const isValid = this.validation.validate(httpRequest.body.email)
    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }
    // sucesso
    return {
      statusCode: 200
    }
  }
}
