import { ExtensionNotFound } from '@app/contexts/images/domain/value-objects/error/ExtenstionNotFound';
import { Path } from '@app/contexts/images/domain/value-objects/Path';

describe('Path', () => {
  describe('getExtension', () => {
    it('should return the file extension', () => {
      const path = new Path('/path/to/file.txt');
      const extension = path.getExtension();

      expect(extension.valueOf()).toBe('.txt');
    });

    it('should return the remote file extension', () => {
      const path = new Path('https://example.com/path/to/file.txt');
      const extension = path.getExtension();

      expect(extension.valueOf()).toBe('.txt');
    });

    it('should throw ExtensionNotFound if no extension is found', () => {
      const path = new Path('/path/to/file');

      expect(() => path.getExtension()).toThrow(ExtensionNotFound);
    });
  });

  describe('isRemote', () => {
    it('should return true for remote paths', () => {
      const remotePath = new Path('https://example.com/file.txt');
      const isRemote = remotePath.isRemote();

      expect(isRemote).toBe(true);
    });

    it('should return false for local paths', () => {
      const localPath = new Path('/path/to/file.txt');
      const isRemote = localPath.isRemote();

      expect(isRemote).toBe(false);
    });
  });
});
