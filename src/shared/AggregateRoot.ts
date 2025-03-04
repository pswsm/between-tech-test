import { StringValueObject } from './StringValueObject';

export abstract class AggregateRoot {
  constructor(protected readonly id: StringValueObject) {}
  public abstract toPrimitives();
}
