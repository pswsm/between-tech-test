import { Inject } from '@nestjs/common';
import { Image } from '../domain/Image';
import { ImageRepository } from '../domain/ImageRepository';
import { ImageId } from '../domain/value-objects/ImageId';
import { ImageNotFound } from './errors/ImageNotFound';

export default class ImageFinder {
  constructor(
    @Inject('ImageRepository') private readonly repository: ImageRepository,
  ) {}

  public async get(id: ImageId): Promise<Image> {
    const image = await this.repository.find(id);

    if (!image) {
      throw new ImageNotFound(id);
    }

    return image;
  }
}
