import { MD5Hash } from 'src/shared/MD5Hash';
import { Image } from '../domain/Image';
import { ImageId } from '../domain/value-objects/ImageId';
import { Path } from '../domain/value-objects/Path';
import { Timestamp } from 'src/shared/Timestamp';
import { ImageRepository } from '../domain/ImageRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export default class ImageCreator {
  constructor(
    @Inject('ImageRepository') private readonly repository: ImageRepository,
  ) {}
  public async create(imagePath: Path, hash: MD5Hash): Promise<Image> {
    const image = new Image(ImageId.new(), imagePath, hash, Timestamp.now());

    await this.repository.insert(image);

    return image;
  }
}
