import { MD5Hash } from '../MD5Hash';

describe('MD5Hash', () => {
  const string = 'test';
  const hash = '098f6bcd4621d373cade4e832627b4f6';
  describe('new', () => {
    it('should create a new hash from a string', () => {
      expect(MD5Hash.new(string)).toMatchObject({
        value: hash,
      });
    });
  });

  describe('constructor', () => {
    it('should return an new instance with the same value passed', () => {
      expect(new MD5Hash(hash)).toMatchObject({
        value: hash,
      });
    });
  });
});
