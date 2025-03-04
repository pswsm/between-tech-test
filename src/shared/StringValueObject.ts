import { ValueObject } from "./ValueObject";
import { InvalidStringError } from "./errors/InvalidStringError";

export class StringValueObject extends ValueObject<string> {
  constructor(value: string) {
    if (value === "") {
      throw new InvalidStringError("Invalid string");
    }
    super(value);
  }

  public equals(other: ValueObject<string>): boolean {
    return other.valueOf() === this.value;
  }
}
