import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateImageStrategy } from './CreateImageStrategy';
import { Path } from '../domain/value-objects/Path';
import { Image } from '../domain/Image';
import { writeFile } from 'fs/promises';
import { Timestamp } from '@app/shared/Timestamp';
import { EventName } from '@app/event-handlers/events/EventNames';
import { MD5Hash } from '@app/shared/MD5Hash';
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
    const localPath: Path = new Path(
      `${DownloadFolder}/${hash.valueOf()}${imagePath.getExtension().valueOf()}`,
    );
    await writeFile(localPath.valueOf(), buf);
    const image = new Image(ImageId.new(), localPath, hash, Timestamp.now());

    this.eventEmitter.emit(EventName.ImageCreated, {
      id: image.getId().valueOf(),
    });

    return image;
  }
}
