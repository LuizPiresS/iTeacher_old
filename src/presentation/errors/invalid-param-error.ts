export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`O parametro ${paramName} é invalido`)
    this.name = 'InvalidParamError'
  }
}
