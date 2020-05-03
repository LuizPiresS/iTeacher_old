import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const duplicatedFieldError = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}
