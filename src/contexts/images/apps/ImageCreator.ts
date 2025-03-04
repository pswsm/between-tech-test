import { Image } from '../domain/Image';
import { ImageId } from '../domain/value-objects/ImageId';
import { Path } from '../domain/value-objects/Path';

export class ImageCreator {
  public static create(imagePath: Path): Image {
    return new Image(ImageId.new(), imagePath);
  }
}
