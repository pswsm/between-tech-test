import { ImageId } from '../../domain/value-objects/ImageId';

export class ImageNotFound extends Error {
  constructor(id: ImageId) {
    super(`image with id: ${id.valueOf()} not found`);
  }
}
