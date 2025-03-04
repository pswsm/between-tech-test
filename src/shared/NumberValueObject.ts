import { ValueObject } from './ValueObject';

export class NumberValueObject extends ValueObject<number> {
  public equals(other: NumberValueObject): boolean {
    return other.valueOf() == this.value;
  }
}
