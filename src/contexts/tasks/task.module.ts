import { Module } from '@nestjs/common';
import TaskCreator from './apps/TaskCreator';
import TaskFinder from './apps/TaskFinder';
import MongoTaskRepository from './infra/MongoTaskRepository';
import { ImageModule } from '../images/images.module';
import TaskFailedUpdater from './apps/TaskFailedUpdater';
import TaskCompletedUpdater from './apps/TaskComepletedUpdater';

@Module({
  exports: [TaskCreator, TaskFinder, TaskFailedUpdater, TaskCompletedUpdater],
  imports: [ImageModule],
  providers: [
    TaskCreator,
    TaskFinder,
    {
      provide: 'TaskRepository',
      useClass: MongoTaskRepository,
    },
    TaskFailedUpdater,
    TaskCompletedUpdater,
  ],
})
export class TaskModule {}
