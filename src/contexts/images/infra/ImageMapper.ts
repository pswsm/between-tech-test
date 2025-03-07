import { PrimitiveOf } from '@app/shared/FromPrimitves';
import { Image } from '../domain/Image';
import { MongoImageDocument } from './MongoImageDocument';
import { ObjectId } from 'mongodb';

export class ImageMapper {
  public static toDomain(document: MongoImageDocument): Image {
    const primitives: PrimitiveOf<Image> = {
      id: document._id.toHexString(),
      path: document.path,
      hash: document.hash,
      createdAt: document.createdAt,
      resolution: document.resolution || undefined,
    };

    return Image.fromPrimitives(primitives);
  }

  public static toDocument(image: Image): MongoImageDocument {
    const primitives = image.toPrimitives();

    return {
      _id: new ObjectId(primitives.id),
      path: primitives.path,
      hash: primitives.hash,
      createdAt: primitives.createdAt,
      resolution: primitives.resolution ?? undefined,
    };
  }
}
