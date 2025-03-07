import { MD5Hash } from '@app/shared/MD5Hash';
import { ImageId } from '../domain/value-objects/ImageId';
import { Path } from '../domain/value-objects/Path';
import { CreateImageStrategy } from './CreateImageStrategy';
import { UnreadableImage } from './errors/UnreadableImage';
import { Timestamp } from '@app/shared/Timestamp';
import { readFile } from 'fs/promises';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Image } from '../domain/Image';
import { EventName } from '@app/event-handlers/events/EventNames';

export default class CreateLocalImageStrategy implements CreateImageStrategy {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  public async create(imagePath: Path): Promise<Image> {
    let buffer: Buffer;
    try {
      buffer = await readFile(imagePath.valueOf());
    } catch {
      throw new UnreadableImage(imagePath);
    }
    const hash = MD5Hash.new(buffer);
    const image = new Image(ImageId.new(), imagePath, hash, Timestamp.now());

    this.eventEmitter.emit(EventName.ImageCreated, {
      id: image.getId().valueOf(),
    });

    return image;
  }
}
