import { PrimitiveOf } from 'src/shared/FromPrimitves';
import { Image } from '../domain/Image';
import { MongoImageDocument } from './MongoImageDocument';

export class ImageMapper {
  public static toDomain(document: MongoImageDocument): Image {
    const primitives: PrimitiveOf<Image> = {
      id: document._id.toHexString(),
      path: document.path,
      resolution: document.resolution || undefined,
    };
    return Image.fromPrimitives(primitives);
  }
}
