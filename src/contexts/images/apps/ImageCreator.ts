import { Path } from '../domain/value-objects/Path';
import { ImageRepository } from '../domain/ImageRepository';
import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateImageStrategy } from './CreateImageStrategy';
import { Image } from '../domain/Image';
import { EventName } from '@app/event-handlers/events/EventNames';
import CreateRemoteImageStrategy from './CreateRemoteImageStrategy';
import CreateLocalImageStrategy from './CreateLocalImageStrategy';

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
    } else {
      this.strategy = new CreateLocalImageStrategy(this.eventEmitter);
    }
    const image = await this.strategy.create(imagePath);

    await this.repository.insert(image);
    this.eventEmitter.emit(EventName.ImageCreated, {
      id: image.getId().valueOf(),
    });

    return image;
  }
}
