import { Module } from '@nestjs/common';
import TaskCreator from './apps/TaskCreator';
import TaskFinder from './apps/TaskFinder';
import MongoTaskRepository from './infra/MongoTaskRepository';

@Module({
  exports: [TaskCreator, TaskFinder],
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
