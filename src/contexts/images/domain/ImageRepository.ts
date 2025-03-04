import { Image } from './Image';
import { ImageId } from './value-objects/ImageId';

export interface ImageRepository {
  find(id: ImageId): Promise<Image | null>;
}
