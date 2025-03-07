import { Module } from '@nestjs/common';
import { TaskModule } from './contexts/tasks/task.module';
import { ImageModule } from './contexts/images/images.module';
import { GetTaskController } from './controllers/GetTaskController';
import { PostTaskController } from './controllers/PostTaskController';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [TaskModule, ImageModule, EventEmitterModule.forRoot()],
  controllers: [GetTaskController, PostTaskController],
  providers: [],
})
export class AppModule {}
