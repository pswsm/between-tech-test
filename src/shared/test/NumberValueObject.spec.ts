import { NumberValueObject } from '../NumberValueObject';

describe('NumberValueObject', () => {
  describe('constructor', () => {
    it('should work', () => {
      expect(new NumberValueObject(12)).toMatchObject({
        value: 12,
      });
    });
  });
  describe('valueOf', () => {
    it('should return the value primitive', () => {
      const vo = new NumberValueObject(1);
      expect(vo.valueOf()).toBe(1);
    });
  });

  describe('equals', () => {
    it('should return true if values are equal', () => {
      const f = new NumberValueObject(121);
      const s = new NumberValueObject(121);
      expect(f.equals(s)).toBeTruthy();
    });

    it('should return false if values are not equal', () => {
      const f = new NumberValueObject(1);
      const s = new NumberValueObject(2);
      expect(f.equals(s)).toBeFalsy();
    });
  });
});
