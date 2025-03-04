import { Image } from '../domain/Image';
import { MongoImageDocument } from './MongoImageDocument';

export class ImageMapper {
  public static toDomain(document: MongoImageDocument): Image {
    return new Image();
  }
}
