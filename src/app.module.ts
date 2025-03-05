import { Module } from '@nestjs/common';
import { TaskController } from './controllers/TaskController';
import { TaskModule } from './contexts/tasks/task.module';
import { ImageModule } from './contexts/images/images.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TaskModule, ImageModule],
  controllers: [TaskController, AppController],
  providers: [AppService],
})
export class AppModule {}
