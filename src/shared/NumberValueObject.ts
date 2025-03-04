import { ValueObject } from "./ValueObject";

export class NumberValueObject extends ValueObject<Number> {
	public equals(other: NumberValueObject): boolean {
		return other.valueOf() == this.value;
	}
}
