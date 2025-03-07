import { PrimitiveOf } from 'src/shared/FromPrimitves';
import { PriceCurrency } from './value-object/PriceCurrency';
import { Unit } from './value-object/Unit';

export class Price {
  public static fromPrimitives(primitives: PrimitiveOf<Price>): Price {
    return new Price(
      new Unit(primitives.units),
      new PriceCurrency(primitives.currency),
    );
  }

  constructor(
    private readonly units: Unit,
    private readonly currency: PriceCurrency,
  ) {}

  public getUnits(): Unit {
    return this.units;
  }

  public toPrimitives() {
    return {
      units: this.units.valueOf(),
      currency: this.currency.valueOf(),
    };
  }
}
