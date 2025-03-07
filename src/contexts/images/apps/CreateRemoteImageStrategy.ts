import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateImageStrategy } from './CreateImageStrategy';
import { Path } from '../domain/value-objects/Path';
import { Image } from '../domain/Image';
import { writeFile } from 'fs/promises';
import { Timestamp } from 'src/shared/Timestamp';
import { EventName } from 'src/shared/events/EventNames';
import { MD5Hash } from 'src/shared/MD5Hash';
import { ImageId } from '../domain/value-objects/ImageId';
import { DownloadFolder } from './DownloadFolder';
import { UnreadableImage } from './errors/UnreadableImage';

export default class CreateRemoteImageStrategy implements CreateImageStrategy {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  public async create(imagePath: Path): Promise<Image> {
    const responseBody = await fetch(imagePath.valueOf()).then((res) => {
      if (!res.ok) {
        throw new UnreadableImage(imagePath);
      }
      return res.arrayBuffer();
    });
    const buf = Buffer.from(responseBody);
    const hash = MD5Hash.new(buf);
    await writeFile(
      `${DownloadFolder}/${hash.valueOf()}.${imagePath.getExtension().valueOf()}`,
      buf,
    );
    const image = new Image(ImageId.new(), imagePath, hash, Timestamp.now());

    this.eventEmitter.emit(EventName.ImageCreated, {
      id: image.getId().valueOf(),
    });

    return image;
  }
}
