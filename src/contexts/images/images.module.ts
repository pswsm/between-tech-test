import { Module } from '@nestjs/common';
import ImageCreator from './apps/ImageCreator';
import ImageFinder from './apps/ImageFinder';
import MongoImageRepository from './infra/MongoImageRespository';
import CreateLocalImageStrategy from './apps/CreateLocalImageStrategy';

@Module({
  exports: [ImageCreator, ImageFinder],
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
  ],
})
export class ImageModule {}
