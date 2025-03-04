import { PrimitiveOf } from 'src/shared/FromPrimitves';
import { NumberValueObject } from 'src/shared/NumberValueObject';
import { PriceCurrency } from './value-object/PriceCurrency';

export class Price {
  public static fromPrimitives(primitives: PrimitiveOf<Price>): Price {
    return new Price(
      new NumberValueObject(primitives.units),
      new PriceCurrency(primitives.currency),
    );
  }
  constructor(
    private readonly units: NumberValueObject,
    private readonly currency: PriceCurrency,
  ) {}

  public toPrimitives() {
    return {
      units: this.units.valueOf(),
      currency: this.currency.valueOf(),
    };
  }
}
