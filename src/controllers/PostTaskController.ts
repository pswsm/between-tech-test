import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { TaskViewModel } from './view-models/TaskViewModel';
import ImageFinder from 'src/contexts/images/apps/ImageFinder';
import { PostTaskBody } from './bodies/PostTaskBody';
import { PostTaskResource } from './resources/PostTaskResource';
import TaskCreator from 'src/contexts/tasks/apps/TaskCreator';
import { Path } from 'src/contexts/images/domain/value-objects/Path';

@Controller('tasks')
export class PostTaskController {
  private readonly logger = new Logger(PostTaskController.name);

  constructor(
    private readonly taskCreator: TaskCreator,
    private readonly imageFinder: ImageFinder,
  ) {}

  @Post()
  public async postTask(
    @Body() postTaskBody: PostTaskBody,
  ): Promise<PostTaskResource> {
    try {
      const path = new Path(postTaskBody.path);
      const task = await this.taskCreator.create(path);
      return await new TaskViewModel(this.imageFinder).toResource(task);
    } catch (error: unknown) {
      const e = error as Error;
      this.logger.error(e.message);
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
