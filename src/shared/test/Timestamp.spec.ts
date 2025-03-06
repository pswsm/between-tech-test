import { InvalidTimestampError } from '../errors/InvalidTiemstampError';
import { Timestamp } from '../Timestamp';

describe('Timestamp', () => {
  const twenty_oct = 1066665600000;
  describe('now', () => {
    it('should return current time as timestamp', () => {
      const now = Timestamp.now();
      expect(now).toHaveProperty('value');
      expect(now).not.toMatchObject({ value: twenty_oct });
    });
  });

  describe('constructor', () => {
    it('should return an instance', () => {
      expect(() => new Timestamp(twenty_oct)).not.toThrow();
      expect(new Timestamp(twenty_oct)).toMatchObject({ value: twenty_oct });
    });

    it('should throw an error if timestamp is less than 0', () => {
      expect(() => new Timestamp(-1)).toThrow(InvalidTimestampError);
    });
  });

  describe('isAfter', () => {
    const after_t = 1069347600000;
    it('should return true', () => {
      const before = new Timestamp(twenty_oct);
      const after = new Timestamp(after_t);

      expect(after.isAfter(before)).toBeTruthy();
    });
    it('should return false', () => {
      const before = new Timestamp(twenty_oct);
      const after = new Timestamp(after_t);

      expect(before.isAfter(after)).toBeFalsy();
    });
  });
});
