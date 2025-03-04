import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { TaskNotFound } from 'src/contexts/tasks/apps/errors/TaskNotFound';
import TaskFinder from 'src/contexts/tasks/apps/TaskFinder';
import { TaskId } from 'src/contexts/tasks/domain/value-object/TaskId';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskFinder: TaskFinder) {}

  @Get(':taskId ')
  public async getTask(@Param('taskId') taskId: string) {
    try {
      const task = await this.taskFinder.find(new TaskId(taskId));
    } catch (error: unknown) {
      if ((error as Error).constructor.name === 'TaskNotFound') {
        throw new HttpException(
          (error as TaskNotFound).message,
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }
}
