export abstract class ValueObject<T> {
	constructor(protected readonly value: T) {};

	public valueOf(): T {
		return this.value;
	}

	public abstract equals(other: ValueObject<T>): boolean;
}
