import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { ISecurity } from '../core/common/security.interface';

export class SecurityAdapter implements ISecurity {
  //TODO: Colocar no env
  private TOKEN_SECRET = 'YOUR_TOKEN_SECRET';

  encryptPassword(value: string): string {
    const hash = crypto.createHash('sha256');

    hash.update(value);

    return hash.digest('hex');
  }

  validateToken(token: string): boolean {
    return !!jwt.verify(token, this.TOKEN_SECRET);
  }

  encodeToken<T extends object>(data: T): string {
    return jwt.sign(data, this.TOKEN_SECRET);
  }

  decodeToken<T extends object>(token: string): T {
    const value = jwt.decode(token) as any;

    if (!value) {
      throw new Error('empty token');
    }

    return value;
  }
}
