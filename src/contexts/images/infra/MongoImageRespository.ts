import { GlobalDataSource } from 'src/shared/MongoClient';
import { Image } from '../domain/Image';
import { ImageRepository } from '../domain/ImageRepository';
import { ImageId } from '../domain/value-objects/ImageId';
import { MongoImageDocument } from './MongoImageDocument';
import { ObjectId } from 'mongodb';
import { ImageMapper } from './ImageMapper';

export default class MongoImageRepository implements ImageRepository {
  private readonly db = GlobalDataSource;
  private readonly coillectionName = 'images';

  public async find(id: ImageId): Promise<Image | null> {
    const document: MongoImageDocument | null = await this.db
      .getCollection(this.coillectionName)
      .findOne<MongoImageDocument>({ _id: new ObjectId(id.valueOf()) });

    if (!document) {
      return null;
    }

    return ImageMapper.toDomain(document);
  }
}
