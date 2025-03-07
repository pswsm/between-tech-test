import { ImageMother } from '../../../mothers/ImageMother';
import { Image } from '../../../../contexts/images/domain/Image';

describe('Image', () => {
  const mother = new ImageMother();
  const primitives = {
    id: mother.id.valueOf(),
    path: mother.path.valueOf(),
    hash: mother.hash.valueOf(),
    createdAt: mother.createdAt.valueOf(),
    resolution: mother.resolution?.valueOf(),
  };

  describe('fromPrimitives', () => {
    it('should recover state', () => {
      const image = Image.fromPrimitives(primitives);

      expect(image).toMatchObject(mother.build());
    });
  });

  describe('constructor', () => {
    it('should return a new instance with no resolution', () => {
      expect(
        new Image(mother.id, mother.path, mother.hash, mother.createdAt),
      ).toMatchObject({
        id: mother.id,
        path: mother.path,
        hash: mother.hash,
        createdAt: mother.createdAt,
      });
    });

    it('should return a new instance with resolution', () => {
      expect(
        new Image(
          mother.id,
          mother.path,
          mother.hash,
          mother.createdAt,
          mother.resolution,
        ),
      ).toMatchObject({
        id: mother.id,
        path: mother.path,
        hash: mother.hash,
        createdAt: mother.createdAt,
        resolution: mother.resolution,
      });
    });
  });
});
