export class DuplicatedFieldError extends Error {
  constructor (field: string) {
    super(`Este ${field} já esta em uso!`)
    this.name = 'DuplicatedFieldError'
  }
}
