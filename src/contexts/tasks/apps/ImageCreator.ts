import { Image } from '../domain/Image';
import { Id } from '../domain/value-object/Id';
import { Path } from '../domain/value-object/Path';

export class ImageCreator {
  public static create(imagePath: Path): Image {
    return new Image(Id.new(), imagePath);
  }
}
