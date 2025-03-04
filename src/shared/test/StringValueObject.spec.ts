import { StringValueObject } from '../StringValueObject';
import { InvalidStringError } from '../errors/InvalidStringError';

describe('StringValueObject', () => {
  describe('constructor', () => {
    it('should work', () => {
      expect(new StringValueObject('12')).toMatchObject({
        value: '12',
      });
    });

    it('should throw an error on empty string', () => {
      expect(() => new StringValueObject('')).toThrow(InvalidStringError);
    });
  });

  describe('valueOf', () => {
    it('should return the value primitive', () => {
      const vo = new StringValueObject('test');
      expect(vo.valueOf()).toBe('test');
    });
  });

  describe('equals', () => {
    it('should return true if values are equal', () => {
      const f = new StringValueObject('string');
      const s = new StringValueObject('string');
      expect(f.equals(s)).toBeTruthy();
    });

    it('should return false if values are not equal', () => {
      const f = new StringValueObject('string');
      const s = new StringValueObject('second');
      expect(f.equals(s)).toBeFalsy();
    });
  });
});
