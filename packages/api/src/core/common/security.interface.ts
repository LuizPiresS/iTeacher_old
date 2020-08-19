export interface Security {
  encryptPassword(value: string): string

  validateToken(token: string): boolean

  encodeToken(data: []): string

  decodeToken(token: string): string
}
