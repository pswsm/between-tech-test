import { Module } from '@nestjs/common';
import { ImageModule } from 'src/contexts/images/images.module';
import TaskCreatedEventHandler from './TaskCreatedEventHandler';
import TaskResizeFailedEventHandler from './TaskResizeFailedEventHandler';
import TaskImagesResizedEventHandler from './TaskImagesResizedEventHandler';

@Module({
  imports: [ImageModule, TaskModule],
  providers: [
    TaskCreatedEventHandler,
    TaskResizeFailedEventHandler,
    TaskImagesResizedEventHandler,
  ],
})
export class TaskModule {}
