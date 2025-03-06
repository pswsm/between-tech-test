import { Injectable } from '@nestjs/common';
import { Resolution } from '../domain/value-objects/Resolution';
import sharp from 'sharp';
import ImageFinder from './ImageFinder';
import ImageCreator from './ImageCreator';
import { Image } from '../domain/Image';
import { OutputFolder } from './OutputFolder';
import { MD5Hash } from 'src/shared/MD5Hash';
import { writeFile } from 'node:fs/promises';

@Injectable()
export default class ImageResizer {
  constructor(
    private readonly imageFinder: ImageFinder,
    private readonly imageCreator: ImageCreator,
  ) {}

  public async resizeTo(image: Image, resolution: Resolution): Promise<void> {
    const path = image.getPath();
    const format = image.getExtension();
    const buf = await sharp(path.valueOf())
      .resize(resolution.valueOf())
      .toBuffer();
    const hash = MD5Hash.new(buf);
    await writeFile(
      `${OutputFolder}/${hash.valueOf()}.${format.valueOf()}`,
      buf,
    );
  }
}
