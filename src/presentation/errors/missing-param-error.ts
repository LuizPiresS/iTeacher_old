export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`O parametro ${paramName} esta em branco`)
    this.name = 'MissingParamError'
  }
}
