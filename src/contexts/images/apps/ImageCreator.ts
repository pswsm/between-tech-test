import { Path } from '../domain/value-objects/Path';
import { ImageRepository } from '../domain/ImageRepository';
import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateImageStrategy } from './CreateImageStrategy';
import CreateRemoteImageStrategy from './CreateRemoteImageStrategy';
import { Image } from '../domain/Image';

@Injectable()
export default class ImageCreator {
  constructor(
    @Inject('ImageRepository') private readonly repository: ImageRepository,
    private readonly eventEmitter: EventEmitter2,
    @Inject('CreateImageStrategy') private strategy: CreateImageStrategy,
  ) {}

  public async create(imagePath: Path): Promise<Image> {
    if (imagePath.isRemote()) {
      this.strategy = new CreateRemoteImageStrategy(this.eventEmitter);
    }
    return await this.strategy.create(imagePath);
  }
}
