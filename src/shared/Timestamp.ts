import { InvalidTimestampError } from './errors/InvalidTiemstampError';
import { NumberValueObject } from './NumberValueObject';

export class Timestamp extends NumberValueObject {
  public static now(): Timestamp {
    return new Timestamp(new Date().getTime());
  }

  constructor(value: number) {
    if (value < 0) {
      throw new InvalidTimestampError(value);
    }
    super(value);
  }

  public isAfter(timestamp: Timestamp): boolean {
    if (this.value > timestamp.valueOf()) {
      return true;
    }
    return false;
  }
}
