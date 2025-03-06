import { createHash, type Hash } from 'node:crypto';
import { StringValueObject } from './StringValueObject';

export class MD5Hash extends StringValueObject {
  public static new(value: string): MD5Hash {
    const hasher: Hash = createHash('md5');
    const hashedValue: string = hasher.update(value).digest('hex');
    return new MD5Hash(hashedValue);
  }
}
