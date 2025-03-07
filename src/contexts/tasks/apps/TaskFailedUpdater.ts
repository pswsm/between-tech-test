import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '../domain/TaskRepository';
import TaskFinder from './TaskFinder';
import { TaskId } from '../domain/value-object/TaskId';

@Injectable()
export default class TaskFailedUpdater {
  constructor(
    private readonly taskFinder: TaskFinder,
    @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
  ) {}

  public async failed(taskId: TaskId): Promise<void> {
    const task = await this.taskFinder.find(taskId);
    task.fail();
  }
}
