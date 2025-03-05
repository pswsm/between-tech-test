import { Module } from '@nestjs/common';
import ImageCreator from './apps/ImageCreator';
import ImageFinder from './apps/ImageFinder';
import MongoImageRepository from './infra/MongoImageRespository';

@Module({
  exports: [ImageCreator, ImageFinder],
  providers: [
    ImageCreator,
    ImageFinder,
    {
      provide: 'ImageRepository',
      useClass: MongoImageRepository,
    },
  ],
})
export class ImageModule {}
