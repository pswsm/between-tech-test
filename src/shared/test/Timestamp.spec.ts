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
});
