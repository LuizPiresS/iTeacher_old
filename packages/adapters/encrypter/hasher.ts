import { createHash } from 'crypto';

import { Hasher } from '../../core/utils/encrypter/hasher';

export class HasherAdapter implements Hasher {
  async hash(data: string): Promise<string> {
    const hash = createHash('sha256');

    hash.update(data);
    return hash.digest('hex');
  }
}
