import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
} from '@nestjs/common';
import { TaskNotFound } from 'src/contexts/tasks/apps/errors/TaskNotFound';
import TaskFinder from 'src/contexts/tasks/apps/TaskFinder';
import { TaskId } from 'src/contexts/tasks/domain/value-object/TaskId';
import { TaskViewModel } from './view-models/TaskViewModel';
import ImageFinder from 'src/contexts/images/apps/ImageFinder';

@Controller('tasks')
export class GetTaskController {
  private readonly logger = new Logger(GetTaskController.name);

  constructor(
    private readonly taskFinder: TaskFinder,
    private readonly imageFinder: ImageFinder,
  ) {}

  @Get(':taskId')
  public async getTask(@Param('taskId') taskId: string) {
    try {
      const task = await this.taskFinder.find(new TaskId(taskId));
      const viewModel = new TaskViewModel(this.imageFinder);

      return viewModel.toResource(task);
    } catch (error: unknown) {
      const e = error as Error;
      this.logger.error(e.message);
      if ((error as Error).constructor.name === 'TaskNotFound') {
        throw new HttpException(
          (error as TaskNotFound).message,
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
