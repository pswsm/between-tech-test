import { Price } from '@app/contexts/tasks/domain/Price';
import { PriceCurrency } from '@app/contexts/tasks/domain/value-object/PriceCurrency';
import { Unit } from '@app/contexts/tasks/domain/value-object/Unit';

describe('Price', () => {
  const unit = new Unit(12);
  const currency = PriceCurrency.EUR;
  const primitives = {
    units: unit.valueOf(),
    currency: currency.valueOf(),
  };
  const price = Price.fromPrimitives(primitives);

  describe('fromPrimitives', () => {
    it('should recover Price', () => {
      expect(Price.fromPrimitives(primitives)).toMatchObject({
        units: new Unit(12),
        currency: PriceCurrency.EUR,
      });
    });
  });

  describe('constructor', () => {
    expect(new Price(unit, currency)).toMatchObject({
      units: new Unit(12),
      currency: PriceCurrency.EUR,
    });
  });

  describe('getUnits', () => {
    expect(price.getUnits()).toMatchObject(unit);
  });

  describe('toPrimitives', () => {
    const localPrimitives = price.toPrimitives();

    expect(localPrimitives).toMatchObject(primitives);
  });
});
