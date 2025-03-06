import { MD5Hash } from 'src/shared/MD5Hash';
import { Image } from '../domain/Image';
import { ImageId } from '../domain/value-objects/ImageId';
import { Path } from '../domain/value-objects/Path';
import { Timestamp } from 'src/shared/Timestamp';

export default class ImageCreator {
  public static create(imagePath: Path): Image {
    return new Image(
      ImageId.new(),
      imagePath,
      MD5Hash.new(imagePath.valueOf()),
      Timestamp.now(),
    );
  }
}
