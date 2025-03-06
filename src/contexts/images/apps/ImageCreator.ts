import { MD5Hash } from 'src/shared/MD5Hash';
import { Image } from '../domain/Image';
import { ImageId } from '../domain/value-objects/ImageId';
import { Path } from '../domain/value-objects/Path';
import { Timestamp } from 'src/shared/Timestamp';
import { ImageRepository } from '../domain/ImageRepository';
import { Inject, Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'node:fs/promises';
import { UnreadableImage } from './errors/UnreadableImage';
import { DownloadFolder } from './DownloadFolder';

@Injectable()
export default class ImageCreator {
  constructor(
    @Inject('ImageRepository') private readonly repository: ImageRepository,
  ) {}
  public async create(imagePath: Path): Promise<Image> {
    if (imagePath.isRemote()) {
      return await this.createRemoteImage(imagePath);
    }
    return await this.createLocalImage(imagePath);
  }

  private async createLocalImage(imagePath: Path): Promise<Image> {
    let buffer: Buffer;
    try {
      buffer = await readFile(imagePath.valueOf());
    } catch {
      throw new UnreadableImage(imagePath);
    }
    const hash = MD5Hash.new(buffer);
    return new Image(ImageId.new(), imagePath, hash, Timestamp.now());
  }

  private async createRemoteImage(imagePath: Path): Promise<Image> {
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
    return new Image(ImageId.new(), imagePath, hash, Timestamp.now());
  }
}
