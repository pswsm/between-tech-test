import { Module } from '@nestjs/common';
import ImageCreator from './apps/ImageCreator';
import ImageFinder from './apps/ImageFinder';
import MongoImageRepository from './infra/MongoImageRespository';
import CreateLocalImageStrategy from './apps/CreateLocalImageStrategy';
import ImageResizer from './apps/ImageResizer';

@Module({
  exports: [ImageCreator, ImageFinder, ImageResizer],
  providers: [
    ImageCreator,
    ImageFinder,
    {
      provide: 'ImageRepository',
      useClass: MongoImageRepository,
    },
    {
      provide: 'CreateImageStrategy',
      useClass: CreateLocalImageStrategy,
    },
    ImageResizer,
  ],
})
export class ImageModule {}
