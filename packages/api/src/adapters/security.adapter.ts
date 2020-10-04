/* eslint-disable @typescript-eslint/ban-types */
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { Security } from '../core/common/security.interface'


export class SecurityAdapter implements Security {
  private TOKEN_SECRET = process.env.TOKEN_SECRET

  encryptPassword(value: string): string {
    const hash = crypto.createHash('sha256')

    hash.update(value)

    return hash.digest('hex')
  }

  validateToken(token: string): boolean {
    return !!jwt.verify(token, String(this.TOKEN_SECRET))
  }

  encodeToken<T extends object>(data: T): string {
    return jwt.sign(data, String(this.TOKEN_SECRET))
  }

  decodeToken(token: string): string {
    const value = jwt.decode(token) as any

    if (!value) {
      throw new Error('empty token')
    }

    return value
  }
}
