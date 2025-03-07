import { Inject, Injectable, Logger } from '@nestjs/common';
import { TaskRepository } from '../domain/TaskRepository';
import TaskFinder from './TaskFinder';
import { TaskId } from '../domain/value-object/TaskId';
import { ImageId } from 'src/contexts/images/domain/value-objects/ImageId';

@Injectable()
export default class TaskCompletedUpdater {
  constructor(
    private readonly taskFinder: TaskFinder,
    @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
  ) {}

  public async complete(taskId: TaskId, imageIds: ImageId[]): Promise<void> {
    try {
      const task = await this.taskFinder.find(taskId);
      task.complete(imageIds);
    } catch (e: unknown) {
      Logger.error((e as Error).message);
    }
  }
}
