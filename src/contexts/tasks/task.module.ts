import { Module } from '@nestjs/common';
import TaskCreator from './apps/TaskCreator';
import TaskFinder from './apps/TaskFinder';
import MongoTaskRepository from './infra/MongoTaskRepository';
import { ImageModule } from '../images/images.module';

@Module({
  exports: [TaskCreator, TaskFinder],
  imports: [ImageModule],
  providers: [
    TaskCreator,
    TaskFinder,
    {
      provide: 'TaskRepository',
      useClass: MongoTaskRepository,
    },
  ],
})
export class TaskModule {}
