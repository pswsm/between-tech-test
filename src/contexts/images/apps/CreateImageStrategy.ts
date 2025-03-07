import { Image } from '../domain/Image';
import { Path } from '../domain/value-objects/Path';

export interface CreateImageStrategy {
  create(imagePath: Path): Promise<Image>;
}
