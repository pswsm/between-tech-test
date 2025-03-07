import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { Injectable } from '@nestjs/common';
import { Resolution } from '../domain/value-objects/Resolution';
import { Image } from '../domain/Image';
import { OutputFolder } from './OutputFolder';
import { MD5Hash } from 'src/shared/MD5Hash';
import { Path } from '../domain/value-objects/Path';
import ImageFinder from './ImageFinder';
import ImageCreator from './ImageCreator';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventName } from 'src/event-handlers/events/EventNames';
import { ImageId } from '../domain/value-objects/ImageId';

@Injectable()
export default class ImageResizer {
  constructor(
    private readonly imageFinder: ImageFinder,
    private readonly imageCreator: ImageCreator,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async resizeTo(
    image: Image,
    resolution: Resolution,
  ): Promise<ImageId> {
    const path = image.getPath();
    const format = image.getExtension();
    const buf = await sharp(path.valueOf())
      .resize(resolution.valueOf())
      .toBuffer();
    const hash = MD5Hash.new(buf);
    const newPath = new Path(
      `${OutputFolder}/${hash.valueOf()}.${format.valueOf()}`,
    );
    await writeFile(newPath.valueOf(), buf);
    const resizedImage = await this.imageCreator.create(newPath);
    this.eventEmitter.emit(EventName.ImageCreated, {
      id: image.getId().valueOf(),
    });

    return resizedImage.getId();
  }
}
